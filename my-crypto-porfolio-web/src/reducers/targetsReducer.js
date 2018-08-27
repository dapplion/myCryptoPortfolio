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
      if (action.state.targets) return action.state.targets;
      break;

    case "UPDATE_TARGETS":
      return {
        ...state,
        ...action.targets
      };

    default:
      return state;
  }
};

export default accountsReducer;
