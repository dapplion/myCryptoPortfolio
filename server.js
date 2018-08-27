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

  socket.on('put', (key, val, callback) => {
    console.log('PUT from '+socket.id+' to '+key+' of '+Buffer.byteLength(val, 'utf8')+' bytes')
    db.put(key, val)
    .then(() => {
      socket.broadcast.to(key).emit('update', val);
      callback(null)
    })
    .catch((e) => {
      callback(String(e))
      console.log('putRes err: ' + String(e))
    })

  });

  socket.on('sub', (key, callback) => {
    socket.join(key)
    console.log('SUB from '+socket.id+' to '+key)

    db.get(key)
    .then(res => res.toString('utf8'))
    .then(val => {
      console.log('Sending '+Buffer.byteLength(val, 'utf8')+' bytes to '+socket.id)
      callback(null, val)
    })
    .catch((e) => {
      callback(String(e))
      console.log('getRes err: ' + String(e))
    })
  });
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
