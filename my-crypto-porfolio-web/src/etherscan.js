import ethTokens from "./utils/ethTokens.json";
// Token source https://raw.githubusercontent.com/kvhnuke/etherwallet/mercury/app/scripts/tokens/ethTokens.json
import Web3 from "web3";
// var web3 = new Web3('http://my.ethchain.dnp.dappnode.eth:8545')
// var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
// ws://my.ethchain.dnp.dappnode.eth:8546
// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
const web3 = new Web3("ws://my.ethchain.dnp.dappnode.eth:8546");
// const web3 = new Web3("wss://mainnet.infura.io/ws");
setTimeout(function() {
  // web3.eth.getBlockNumber().then(console.log);
  // getTokenBalances("0xb8f7143Fab9Bc4bDdb8dD567caD3205DF45Acf00");
}, 1000);

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

function getBalance(account) {
  const url =
    "https://api.etherscan.io/api?module=account&action=balance&" +
    "address=" +
    account +
    "&tag=latest&apikey=giveth";
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.status === "1") {
        return res.result / 10 ** 18;
      } else {
        console.error("Error fetching balance", res);
      }
    });
}

async function getTokenBalances(account) {
  let count = 0;
  const label = "Web3 " + ethTokens.length + " tokens";
  console.time(label);
  await Promise.all(
    ethTokens.map(token =>
      getTokenBalanceWeb3(account, token.address, token.decimal).then(() => {
        count++;
        console.log(Math.floor((100 * count) / ethTokens.length));
      })
    )
  );
  console.timeEnd(label);
}

async function getTokenBalance(account, contractAddress, decimals) {
  const url =
    "https://api.etherscan.io/api?module=account&action=tokenbalance" +
    "&contractaddress=" +
    contractAddress +
    "&address=" +
    account +
    "&tag=latest" +
    "&apikey=giveth";
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.status === "1") {
        return res.result / 10 ** decimals;
      } else {
        console.error("Error fetching balance", res);
      }
    });
}

async function getTokenBalanceTokenBalance(account, contractAddress, decimals) {
  const url =
    "https://api.tokenbalance.com/balance/" + contractAddress + "/" + account;
  return fetch(url)
    .then(res => res.json())
    .catch(e => console.error);
}

async function getTokenBalanceWeb3(walletAddress, tokenAddress, decimals) {
  return new Promise((resolve, reject) => {
    // Get ERC20 Token contract instance
    let contract = new web3.eth.Contract(minABI, tokenAddress);
    // Call balanceOf function
    contract.methods.balanceOf(walletAddress).call((error, balance) => {
      // calculate a balance
      resolve(balance / 10 ** 6);
    });
  });
}

export default {
  getBalance,
  getTokenBalances
};
