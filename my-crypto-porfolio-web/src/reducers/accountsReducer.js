import {
  SERVER_UPDATE_ACCOUNTS,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  UPDATE_ACCOUNT
} from "../actions/types";

const initialState = {};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return action.state.accounts;

    case ADD_ACCOUNT:
      return {
        ...state,
        [action.payload.account]: {
          address: action.payload.account,
          name: "account #" + Math.floor(100 * Math.random()),
          lastChecked: 0,
          balance: "loading..."
        }
      };

    case UPDATE_ACCOUNT:
      return {
        ...state,
        [action.address]: {
          ...state[action.address],
          balances: {
            ...state[action.address].balances,
            ...action.balances
          },
          lastChecked: Date.now()
        }
      };

    case REMOVE_ACCOUNT:
      let res = Object.assign({}, state);
      delete res[action.payload];
      return res;

    default:
      return state;
  }
};

export default accountsReducer;
