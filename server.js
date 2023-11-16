const express = require('express');
const {Socket} = require('socket.io')
const app = express()
const path = require('path')
// create an httpServer

const http = require('http').createServer(app);

http.listen(3000,()=>{
    console.log('Listening to port 3000')
})
app.use(express.static(path.join(__dirname + '/public')))

// Write a get route to load the index.html on home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
// Socket code

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('connection');

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})