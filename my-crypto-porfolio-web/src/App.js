import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import generatePassword from 'password-generator'
import CryptoJS from 'crypto-js'

import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:5000')
console.log('Socket connected, id: ', socket)

// initialize
init()

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Initial states of variables must be defined in the constructor
      data: ''
    };
  }

  componentDidMount() {
    socket.on('getRes', res => {
      if (res.err) {
        console.log('err',res.err,'val',res.val)
        if (res.err.includes('not found')) put('')
      } else {
        let data = decrypt(res.val)
        console.log('Successfully retrieved data: ',data)
        this.setState({ data });
      }
    })
  }

  handleChange(e) {
    let data = String(e.target.value)
    console.log('CHANGE: '+data)
    this.setState({ data });
    put(data)
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
              <div className="input-group mb-3">
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

          </div>
        </div>

      </div>
    );
  }
}

export default App;

function encrypt(data) {
  let cred = parseUrlCredentials()
  return CryptoJS.AES.encrypt(data, cred.psw)
    .toString()
}

function decrypt(data) {
  let cred = parseUrlCredentials()
  let bytes = CryptoJS.AES.decrypt(data, cred.psw);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function get() {
  let cred = parseUrlCredentials()
  let key = cred.key
  socket.emit('get', key)
}

function put(data) {
  let cred = parseUrlCredentials()
  let key = cred.key
  let psw = cred.psw
  console.log('PUT PRE-REQ: key',key,'psw',psw,'data',data)
  let val = encrypt(data)
  console.log('PUT REQ: key',key,'val',val)
  socket.emit('put', { key, val })
}


async function init() {
  let credentials = await getCredentials()
  let key = credentials.key
  let psw = credentials.psw
  get(key)
  socket.on('getRes', res => {
    if (res.err) {
      console.log('err',res.err,'val',res.val)
      if (res.err.includes('not found')) put(key, psw, '')
    } else {
      let data = decrypt(res.val)
      console.log('Successfully retrieved data: ',data)
    }
  })
}



// console.log('SENDING KEY:',key,' VAL:',val)


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
    key: hash.split('-')[0],
    psw: hash.split('-')[1]
  }
}

function RedirectToNewHash() {
  let key = generatePassword(12, false)
  let psw = generatePassword(12, false)
  let url = window.location.href
  let hash = window.location.hash
  console.log('url',url,'hash',hash)
  url = url.replace(hash, '')
  let newHash = key + '-' + psw

  // initialize database
  socket.emit('put', { key, val:'' })

  // Redirect to new hash
  window.location.replace(url + '#' + newHash)
}


// let credentails = getCredentials()
// console.log('credentails',credentails)
// get(credentails.key, credentails.psw)
