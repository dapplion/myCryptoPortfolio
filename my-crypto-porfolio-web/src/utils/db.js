import default_credentials from './credentials'
import openSocket from 'socket.io-client'
import crypt from './crypt'


// Initialize
const socket = openSocket('http://localhost:5000')
console.log('Socket connected, id: ', socket)


function get(credentials) {

  let id = credentials.id
  socket.emit('get', id)
}


function put(data, credentials) {

  let id = credentials.id
  let key = credentials.key

  console.log('PUT PRE-REQ: id',id,'key',key,'data',data)
  let val = crypt.encrypt(data, key)

  console.log('PUT REQ: id',id,'val',val)
  socket.emit('put', id, val)
}

// socket.on('getRes', (err, res) => {
//   if (err) {
//     console.log('err',err,'val',res)
//     if (err.includes('not found')) put('')
//   } else {
//     console.log('Successfully retrieved data: ',res)
//     let key = credentials.get().key
//     let data = crypt.decrypt(res, key)
//     this.setState({ data });
//   }
// })

export default {
  get,
  put
}
