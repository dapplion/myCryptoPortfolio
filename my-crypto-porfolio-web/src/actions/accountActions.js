import { SERVER_UPDATE_ACCOUNTS, ADD_ACCOUNT, REMOVE_ACCOUNT } from './types'
import etherscan from '../etherscan'

// Exports a function which returns a function with the argument (dispatch)
export const updateAccounts = accounts => ({
  type: SERVER_UPDATE_ACCOUNTS,
  payload: accounts
})

export const addAccount = account => ({
  type: ADD_ACCOUNT,
  upload: true,
  payload: {
    account,
    balance: 'loading...'
  }
})

export const removeAccount = account => ({
  type: REMOVE_ACCOUNT,
  upload: true,
  payload: account
})


export const balanceAccount = account => dispatch => {
  // Do something with this account
  console.log('Calling etherscan for: ',account)
  etherscan.getBalance(account)
  .then(balance => dispatch({
    type: ADD_ACCOUNT,
    upload: true,
    payload: {
      account,
      balance
    }
  }))
  .catch(e => console.error)
}


function fakeFetch() {
  return new Promise((resolve, reject) => {
    resolve(['0x3n324n23j4n23ji4ni234nj','0xca7a1a8sahd98ashd98na9asnd'])
  })
}
