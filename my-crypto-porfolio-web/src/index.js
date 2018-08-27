import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// Not needed, history.js specifies the use of Hash.
// import { HashRouter as Router } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import registerServiceWorker from "./registerServiceWorker";
import history from "./history";
import store from "./store";
import App from "./App";

// css
import "./index.css";

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
