import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './store/store'
import * as Action from './action/action'

import generatePassword from 'password-generator'
import CryptoJS from 'crypto-js'
import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000')
console.log('Socket connected, id: ', socket)

nacl.util = naclUtil

// initialize
init()

class AccountList extends Component {
  render() {
    let accounts = this.props.accounts || []
    let accountsRender = accounts.map((account, i) => {
      return <a key={i} href="#" className="list-group-item list-group-item-action">{account}</a>
    })
    return (
      <div>
        <div className="row">
          <h3>Account List</h3>
        </div>
        <div className="row">
          <div className="list-group">
            {accountsRender}
          </div>
        </div>
      </div>
    )
  }
}


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

    socket.on('getRes', (err, res) => {
      if (err) {
        console.log('err',err,'val',res)
        if (err.includes('not found')) put('')
      } else {
        console.log('Successfully retrieved data: ',res)
        let data = decrypt(res)
        this.setState({ data });
      }
    })
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
    put(data)
  }

  addAccount(e) {
    let input = document.getElementById('accountInput').value
    Action.addAccount(input)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Crypto Portfolio PoC</h1>
        </header>
        <div className="album py-5 bg-light">
          <div className="container">

            <div className="row">
              <h3>Test live collaboration</h3>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Data to encrypt" aria-label="Recipient's username" aria-describedby="basic-addon2"
                value={this.state.data}
                onChange={this.handleChange.bind(this)}
                >
                </input>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">Put</button>
                </div>
              </div>
            </div>

            <div className="row">
              <h3>Add account</h3>
              <div className="input-group">
                <input id="accountInput" type="text" className="form-control" placeholder="Account" aria-label="Account" aria-describedby="basic-addon2">
                </input>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button"
                  onClick={this.addAccount.bind(this)}
                  >Add account</button>
                </div>
              </div>
            </div>

            <AccountList
            accounts={this.state.accounts}
            />

          </div>
        </div>

      </div>
    );
  }
}


export default App;

function encrypt(messageString) {
  // Compute vars
  let cred = parseUrlCredentials()
  let nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
  let key = nacl.util.decodeBase64(cred.key)
  let messageBytes = nacl.util.decodeUTF8(messageString)

  // encrypt
  let box = nacl.secretbox(messageBytes, nonce, key)

  // Concat
  let nonceEncoded = nacl.util.encodeBase64( nonce )
  let cypherText = nacl.util.encodeBase64(box)
  console.log('CYPHER', nonceEncoded + '.' + cypherText)
  return nonceEncoded + '.' + cypherText
  // return CryptoJS.AES.encrypt(data, cred.key)
  //   .toString()
}

function decrypt(input) {
  // compute vars
  let nonceEncoded = input.split('.')[0]
  let cypherText   = input.split('.')[1]
  let cred  = parseUrlCredentials()
  let key   = nacl.util.decodeBase64(cred.key)
  let nonce = nacl.util.decodeBase64(nonceEncoded)
  let box   = nacl.util.decodeBase64(cypherText)

  // decrypt
  let messageBytes = nacl.secretbox.open(box, nonce, key)
  let messageString = nacl.util.encodeUTF8(messageBytes)
  console.log('MESSAGE',messageString)
  // let bytes = CryptoJS.AES.decrypt(data, cred.key);
  // return bytes.toString(CryptoJS.enc.Utf8);
  return messageString
}

function get() {
  let cred = parseUrlCredentials()
  let id = cred.id
  socket.emit('get', id)
}

function put(data) {
  let cred = parseUrlCredentials()
  let id = cred.id
  let key = cred.key
  console.log('PUT PRE-REQ: id',id,'key',key,'data',data)
  let val = encrypt(data)
  console.log('PUT REQ: id',id,'val',val)
  socket.emit('put', id, val)
}


async function init() {
  let credentials = await getCredentials()
  let id = credentials.id
  let key = credentials.key
  get(id)
  socket.on('getRes', (err, res) => {
    if (err) {
      console.log('err',err,'val',res)
      if (err.includes('not found')) put(id, key, '')
    } else {
      console.log('Successfully retrieved data: ',res)
      let data = decrypt(res)
    }
  })
  // // ##########
  // // ##########
  // // ##########
  // Store.on("CHANGE", function(){
  //   let store = JSON.stringify( Store.getStore() )
  //   put(store)
  // })
}



// console.log('SENDING id:',id,' VAL:',val)


function getCredentials() {

  return new Promise(function(resolve, reject) {

    let credentials = parseUrlCredentials()
    console.log('RETRIEVED CREDENTIALS',credentials)
    if (credentials) return resolve(credentials)
    // Credentials missing, generate new ones
    RedirectToNewHash()

  })
}

function parseUrlCredentials() {

  if (!window.location.href.includes('/#')) return
  const hash = window.location.href.split('/#')[1]

  if (!hash.includes('-')) return
  return {
    id: hash.split('-')[0],
    key: hash.split('-')[1]
  }
}

function RedirectToNewHash() {
  let id = nacl.util.encodeBase64( nacl.randomBytes(16) )
  let key = nacl.util.encodeBase64( nacl.randomBytes(nacl.secretbox.keyLength) )
  let url = window.location.href
  let hash = window.location.hash
  console.log('url',url,'hash',hash)
  url = url.replace(hash, '')
  let newHash = id + '-' + key

  // initialize database
  socket.emit('put', id, '')

  // Redirect to new hash
  window.location.replace(url + '#' + newHash)
}


// let credentails = getCredentials()
// console.log('credentails',credentails)
// get(credentails.id, credentails.key)
