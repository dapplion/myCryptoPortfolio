import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import credentials from './utils/credentials'
import redirectToNewHash from './utils/redirect'


// First retrieve the url data or generate new credentials

if (credentials.get()) {
  // Initialize app
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();

} else {
  redirectToNewHash()
}
