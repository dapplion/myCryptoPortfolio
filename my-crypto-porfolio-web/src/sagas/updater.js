import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import {
  all,
  fork,
  take,
  call,
  put,
  cancel,
  takeLatest,
  takeEvery,
  takeLeading
} from "redux-saga/effects";
import * as a from "../actions/connectionActions";
import ethTokens from "../utils/ethTokens.json";
import Web3 from "web3";

// The minimum ABI to get ERC20 Token balance
let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  }
];

const web3 = new Web3("ws://my.ethchain.dnp.dappnode.eth:8546");

async function getTokenBalanceWeb3(walletAddress, tokenAddress, decimals) {
  try {
    const contract = new web3.eth.Contract(minABI, tokenAddress);
    return await contract.methods
      .balanceOf(walletAddress)
      .call()
      .then(balance => (balance ? balance / 10 ** decimals : null));
  } catch (e) {
    return;
  }
}

async function getTokenBalances(address) {
  const balances = {};
  await Promise.all(
    ethTokens.map(token =>
      getTokenBalanceWeb3(address, token.address, token.decimal).then(
        balance => {
          if (balance) balances[token.symbol] = balance;
        }
      )
    )
  );
  return balances;
}

function* fetchTokenBalances(address) {
  const balances = yield call(getTokenBalances, address);
  yield put({
    type: "UPDATE_ACCOUNT",
    upload: true,
    address,
    balances
  });
  yield put({
    type: "FETCH_RATES",
    requestedCoins: [...Object.keys(balances), "ETH"]
  });
}

function* fetchEthBalance(address) {
  const balanceWei = yield call(web3.eth.getBalance, address);
  const balance = web3.utils.fromWei(balanceWei, "ether");
  yield put({
    type: "UPDATE_ACCOUNT",
    upload: true,
    address,
    balances: {
      ETH: parseFloat(balance, 10)
    }
  });
}

function* fetchAccount(address) {
  yield call(fetchEthBalance, address);
  yield call(fetchTokenBalances, address);
}

function* checkAccountBalance(action) {
  yield call(fetchAccount, action.payload.account);
}

function* checkAccountsBalance(action) {
  const accounts = action.state.accounts || {};
  const now = Date.now();
  yield all(
    Object.values(accounts)
      .filter(account => now - account.lastChecked > 5 * 1000)
      .map(account => call(fetchAccount, account.address))
  );
}

function* watchAddAccount() {
  yield takeEvery("ADD_ACCOUNT", checkAccountBalance);
}

function* watchRefreshState() {
  yield takeEvery("REFRESH_STATE", checkAccountsBalance);
}

function* initialFetch() {
  const action = yield take("UPDATE_STATE");
  yield call(checkAccountsBalance, action);
}

export default function*() {
  yield all([watchAddAccount(), watchRefreshState(), initialFetch()]);
}
