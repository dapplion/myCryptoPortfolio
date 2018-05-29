import { SERVER_UPDATE_ACCOUNTS, ADD_ACCOUNT, REMOVE_ACCOUNT } from '../actions/types'

const initialState = {'0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a': 0}

const accountsReducer = (state = initialState, action) => {

  switch(action.type) {

    case SERVER_UPDATE_ACCOUNTS:
      return Object.assign({}, action.payload)

    case ADD_ACCOUNT:
      return {
        ...state,
        [action.payload.account]: action.payload.balance
      }

    case REMOVE_ACCOUNT:
      let res = Object.assign({}, state)
      delete res[action.payload]
      return res

    default:
      return state
  }
}

export default accountsReducer
