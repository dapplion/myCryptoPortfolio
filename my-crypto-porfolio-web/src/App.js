import React, { Component } from 'react';
import Store from './store/store'
import * as Action from './action/action'
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
  constructor() {
    super();
    this.state = {
      // Initial states of variables must be defined in the constructor
      data: '',
      accounts: Store.getAccounts()
    };
  }

  componentDidMount() {
    Store.on("CHANGE", this.updateAccounts.bind(this))
  }

  componentWillUnmount() {
    Store.removeListener("CHANGE", this.updateAccounts.bind(this));
  }

  updateAccounts() {
    this.setState({ accounts: Store.getAccounts() });
  }

  handleChange(e) {
    let data = String(e.target.value)
    console.log('CHANGE: '+data)
    this.setState({ data });
  }

  addAccount(e) {
    let input = document.getElementById('accountInput').value
    Action.addAccount(input)
  }

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
