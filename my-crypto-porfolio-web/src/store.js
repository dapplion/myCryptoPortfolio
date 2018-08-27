import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import * as t from "./actionTypes";
import createSagaMiddleware from "redux-saga";

// App modules
import history from "./history";
import rootSaga from "./sagas";
import rootReducer from "./reducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// When an action has a boolean upload, stringify the whole state
// and dispatch an action so the socket saga emits to the db
const logger = store => next => action => {
  let result = next(action);
  if (typeof action === "object" && action.upload) {
    store.dispatch({
      type: t.UPLOAD,
      state: JSON.stringify(store.getState())
    });
  }
  return result;
};

const middleware = [logger, thunk, routerMiddleware(history), sagaMiddleware];

// eslint-disable-next-line no-underscore-dangle
const devTools =
  process.env.NODE_ENV === "prod" ||
  process.env.NODE_ENV === "production" ||
  (typeof window === "object" && !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? // In production: pass an empty function. This can prevent unexpected errors
      a => a
    : // In development: activate the devtools extension
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  compose(
    applyMiddleware(...middleware),
    devTools
  )
);

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
