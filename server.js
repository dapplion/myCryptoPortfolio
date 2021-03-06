// node modules
const { promisify } = require('util')

// express modules
const app = require('express')()
const express = require('express')

// websocket modules
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 5000

// database modules
const levelup = require('levelup')
const leveldown = require('leveldown')
const DatabaseHandler = require('./modules/DatabaseHandler')

// setup the express server
app.use(express.static('public'));

// setup database
const db = levelup(leveldown('./mydb'))

// setup websocket communications
io.on('connection', function(socket){

  console.log('a user connected: '+socket.id);

  socket.on('disconnect', handleDisconnect);

  socket.on('put', (key, val) => {
    console.log('PUT REQ, val: ---')
    console.log(val)
    console.log('-----------------')
    db.put(key, val, (err) => {
      if (err) {
        console.log('putRes err: ' + String(err))
        socket.emit('error', String(err))
      }
    })
    socket.broadcast.to(key).emit('getRes', '', val);
  });

  socket.on('get', async (key) => {
    socket.join(key)
    console.log('GET REQ, '+JSON.stringify(key))
    let err, val
    try {
      val = ( await db.get(key) ).toString('utf8')
      console.log('GET RESOLVED: ----')
      console.log(val)
      console.log('------------------')
    } catch (e) {
      err = String(e)
    } finally {
      socket.emit('getRes', err, val)
    }
  });

  socket.on('sub', (key) => {
    socket.join(key)
  })

});

// launch server
http.listen(port, function(){
  console.log('listening on *:' + port);
});

function handleDisconnect(){
  console.log('user disconnected '+this);
}



// function get(key){
//   let cipher = db.get(key)
//   io.emit('update', cipher)
// }
