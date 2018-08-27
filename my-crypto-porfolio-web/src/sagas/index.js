import { all } from "redux-saga/effects";

import redirect from "./redirect";
import socket from "./socket";
import updater from "./updater";
import rates from "./rates";

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([redirect(), socket(), updater(), rates()]);
}
