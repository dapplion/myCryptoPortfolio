import { push } from "connected-react-router";
import { eventChannel, delay } from "redux-saga";
import { select, put } from "redux-saga/effects";
import * as a from "../actions/connectionActions";
import credentials from "../utils/credentials";

const hashSelector = state => state.router.location.hash;

// This will be run once, and on startup
export default function* flow() {
  const hash = yield select(hashSelector);
  let currentCredentials = credentials.get(hash);
  if (!currentCredentials) {
    // No valid credentials. Generate new ones and redirect
    const newCredentials = credentials.generate();
    const stringifiedCredentials = credentials.stringify(newCredentials);
    yield put(
      push({
        pathname: "/",
        hash: stringifiedCredentials
      })
    );
    currentCredentials = newCredentials;
    console.log("Generated new credentials", newCredentials);
  }
  // Store them and open socket
  yield put(a.updateCredentials(currentCredentials));
  // Call the action in the next loop to allow the watchers to setup
  yield delay(0);
  yield put(a.openSocket(currentCredentials));

  // dispatch(push("/" + NAME));
}
