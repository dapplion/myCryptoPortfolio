import { FETCH_ACCOUNTS, NEW_ACCOUNT } from './types'
import etherscan from '../etherscan'

// Exports a function which returns a function with the argument (dispatch)
export const fetchAccounts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(users => users.map(u => u.email))
  .then(accounts => dispatch({
    type: FETCH_ACCOUNTS,
    payload: accounts
  }))
}

export const addAccount = account => dispatch => {
  // Do something with this account
  etherscan.getBalance(account)
  .then(balance => dispatch({
    type: NEW_ACCOUNT,
    payload: {
      account,
      balance
    }
  }))
}


function fakeFetch() {
  return new Promise((resolve, reject) => {
    resolve(['0x3n324n23j4n23ji4ni234nj','0xca7a1a8sahd98ashd98na9asnd'])
  })
}
