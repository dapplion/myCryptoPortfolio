import { combineReducers } from "redux";
import accounts from "./accountsReducer";
import rates from "./ratesReducer";
import targets from "./targetsReducer";

export default combineReducers({
  accounts,
  rates,
  targets
});
