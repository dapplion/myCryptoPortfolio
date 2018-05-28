import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'

class AppStore extends EventEmitter {
  constructor() {
    super()
    this.store = {}

    this.tag = {
      ADD_ACCOUNT: 'ADD_ACCOUNT',
      UPDATE_VARIABLE: 'UPDATE_VARIABLE',
      UPDATE_TRADELIST: 'UPDATE_TRADELIST',
      UPDATE_NEWTRADELIST: 'UPDATE_NEWTRADELIST',
      UPDATE_MARKETLIST: 'UPDATE_MARKETLIST',
      UPDATE_STRADDLENAMES: 'UPDATE_STRADDLENAMES',
      UPDATE_MARKET: 'UPDATE_MARKET',
      UPDATE_BALANCE: 'UPDATE_BALANCE',
      UPDATE_AUTHENTICATED: 'UPDATE_AUTHENTICATED',
      UPDATE_SIGNINMESSAGE: 'UPDATE_SIGNINMESSAGE',
      CHANGE: 'CHANGE'
    }

    this.id = {
      ACCOUNTS: 'ACCOUNTS'
    }
  }

  getStore() {
    return this.store
  }
  getAccounts() {
    return this.store[this.id.ACCOUNTS]
  }
  getTradeList() {
    return this.tradeList;
  }
  getNewTradeList() {
    return this.newTradeList;
  }
  getMarketList() {
    return this.marketList;
  }
  getStraddleNames() {
    return this.straddleNames;
  }
  getMarket() {
    return this.market;
  }
  getBalance() {
    let balance = [];
    let coins = this.market.split('-');
    let _this = this;
    coins.forEach(function(coin) {
      balance.push({
        coin: coin,
        balance: _this.balance[coin]
      })
    });
    return balance;
  }
  getTicker() {
    return {
      market: this.market,
      ticker: this.ticker[this.market]
    };
  }
  getAuthenticated() {
    return this.authenticated;
  }
  getSignInMessage() {
    return this.signInMessage;
  }

  handleActions(action) {
    switch(action.type) {
      case this.tag.ADD_ACCOUNT: {
        if (!(this.id.ACCOUNTS in this.store)) this.store[this.id.ACCOUNTS] = []
        this.store[this.id.ACCOUNTS].push(action.account)
        this.emit(this.tag.CHANGE);
        break;
      }
      case this.tag.UPDATE_MARKET: {
        this.market = action.market;
        this.emit(this.tag.CHANGE);
        break;
      }
      default: {
        console.error('UNKNOWN STORE ACTION TYPE: '+action.type)
      }
    }
  }

}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;
