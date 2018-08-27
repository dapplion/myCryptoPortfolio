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

//min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD

const referenceCoins = ["ETH", "USD"];

const fetchCoinPrice = coin => {
  const url =
    "https://min-api.cryptocompare.com/data/price?fsym=" +
    coin +
    "&tsyms=" +
    referenceCoins.join(",");
  return fetch(url).then(res => res.json());
};

async function fetchRatesCryptocompare(requestedCoins, referenceCoins) {
  const rates = {};
  await Promise.all(
    requestedCoins.map(coin =>
      fetchCoinPrice(coin).then(res => {
        if (!res.Response) rates[coin] = res;
      })
    )
  );
  return rates;
}

function* fetchRates(requestedCoins) {
  if (!requestedCoins.length) return;
  const rates = yield call(
    fetchRatesCryptocompare,
    requestedCoins,
    referenceCoins
  );
  yield put({
    type: "UPDATE_RATES",
    rates
  });
}

function* initialFetch() {
  const { state } = yield take("UPDATE_STATE");
  if (!state.accounts) return;
  let coins = {};
  Object.values(state.accounts).forEach(account => {
    coins = {
      ...coins,
      ...account.balances
    };
  });
  yield call(fetchRates, Object.keys(coins));
}

function* watchRequestRates() {
  yield takeEvery("FETCH_RATES", function*(action) {
    // yield call(fetchRates, action.requestedCoins);
  });
}

export default function*() {
  yield all([watchRequestRates(), initialFetch()]);
}
