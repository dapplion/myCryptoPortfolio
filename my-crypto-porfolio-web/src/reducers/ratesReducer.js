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
      if (action.state.rates) return action.state.rates;
      break;

    case "UPDATE_RATES":
      return {
        ...state,
        ...action.rates,
        lastChecked: Date.now()
      };

    default:
      return state;
  }
};

export default accountsReducer;
