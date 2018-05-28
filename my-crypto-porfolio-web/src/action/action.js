import dispatcher from "../dispatcher";
import Store from '../store/store';

export function addAccount(account) {
  dispatcher.dispatch({
    type: Store.tag.ADD_ACCOUNT,
    account: account
  });
}

export function updateNewTradeList(newTradeList) {
  dispatcher.dispatch({
    type: Store.tag.UPDATE_NEWTRADELIST,
    newTradeList: newTradeList
  });
}

export function updateBalance(coin, balance) {
  dispatcher.dispatch({
    type: Store.tag.UPDATE_BALANCE,
    coin: coin,
    balance: balance
  });
}

export function updateTicker(market, ticker) {
  dispatcher.dispatch({
    type: Store.tag.UPDATE_TICKER,
    market: market,
    ticker: ticker
  });
}

export function updateVariable(variable) {
  dispatcher.dispatch({
    type: Store.tag.UPDATE_VARIABLE,
    variable: variable
  });
}
