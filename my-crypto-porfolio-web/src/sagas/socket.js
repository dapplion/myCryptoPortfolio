import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import {
  all,
  fork,
  take,
  call,
  put,
  cancel,
  takeLatest,
  takeEvery,
  takeLeading,
  throttle
} from "redux-saga/effects";
import * as a from "../actions/connectionActions";
import crypt from "../utils/crypt";
import PubSub from "pubsub-js";

// Read
///////

function* read(socket, credentials) {
  const channel = yield call(subscribe, socket, credentials);
  try {
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  } finally {
    console.log("Socket.io read channel terminated");
  }
}

const subscribe = (socket, { key }) =>
  eventChannel(emit => {
    socket.on("users.logout", ({ username }) => {
      // emit(a.removeUser({ username }));
    });
    socket.on("messages.new", ({ message }) => {
      // emit(a.newMessage({ message }));
    });
    socket.on("disconnect", e => {
      // TODO: handle
    });
    socket.on("update", val => {
      const data = crypt.decrypt(val, key);
      const parsedData = JSON.parse(data);
      emit(a.updateState(parsedData));
      PubSub.publish("DOWNLOAD");
    });

    // The subscriber must return an unsubscribe function. Could be socket.off('event', handler)
    return () => {};
  });

// Write
////////

// function* throttleAutocomplete() {
//   yield throttle(1000, "FETCH_AUTOCOMPLETE", fetchAutocomplete);
// }

function* write(socket, { id, key }) {
  const upload = action => {
    PubSub.publish("UPLOAD");
    let val = crypt.encrypt(action.state, key);
    socket.emit("put", id, val, err => {
      if (err) console.error("Put error", err);
    });
  };
  yield throttle(1000, "UPLOAD", upload);
  // yield takeLatest("UPLOAD", upload);
}

// Handlers
///////////

const initialEmit = (socket, id) =>
  new Promise(resolve => {
    socket.emit("sub", id, (err, val) => {
      resolve({ err, val });
    });
  });

const connect = url =>
  new Promise(resolve => {
    const socket = io(url);
    socket.on("connect", () => {
      resolve(socket);
    });
  });

function* handleIO(socket, credentials) {
  yield fork(read, socket, credentials);
  yield fork(write, socket, credentials);
}

function* openSocket(action) {
  const url = "http://localhost:5000";
  const { id, key } = action.credentials;
  // You can connect automatically or upon request
  const socket = yield call(connect, url);
  console.log("Connected!", socket);

  const task = yield fork(handleIO, socket, action.credentials);
  const { err, val } = yield call(initialEmit, socket, id);
  if (err && err.includes("Key not found")) {
    console.log("First time user in this db, initializing", err);
    yield put({ type: "", upload: true });
  } else if (val) {
    const data = crypt.decrypt(val, key);
    const parsedData = JSON.parse(data);
    yield put(a.updateState(parsedData));
  }

  // socket.emit("login", { username: payload.username });
  // let action = yield take(`${logout}`);
  // yield cancel(task);
  // socket.emit("logout");
}

function* watchOpenSocket() {
  yield takeEvery("OPEN_SOCKET", openSocket);
}

export default function*() {
  yield all([watchOpenSocket()]);
}
