import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
// components
import Header from './components/Header'
import InputTest from './components/InputTest'
import AccountList from './components/AccountList'
import AddAccount from './components/AddAccount'
// utils
import crypt from './utils/crypt'
// css
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import './App.css';
import logo from './logo.svg';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <Header />
        <div className="album py-5 bg-light">
          <div className="container">

            <InputTest />

            <AddAccount />

            <AccountList />

          </div>
        </div>

      </div>
      </Provider>
    );
  }
}


export default App;
