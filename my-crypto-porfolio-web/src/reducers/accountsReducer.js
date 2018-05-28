import { FETCH_ACCOUNTS, NEW_ACCOUNT } from '../actions/types'

const initialState = {'0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a': 0}

const accountsReducer = (state = initialState, action) => {
  switch(action.type) {
    // case FETCH_ACCOUNTS:
    //   return {
    //     ...state,
    //     items: action.payload
    //   }
    case NEW_ACCOUNT:
      return {
        ...state,
        [action.payload.account]: action.payload.balance
      }
    default:
      return state
  }
}

export default accountsReducer
