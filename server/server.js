const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
// const mongoose = require('mongoose');
let db = undefined;

app.use(express.static('client'))
const hostname = 'localhost';

const port = process.env.PORT||8181;

//attach http server to the socket io
const io = require('socket.io')(http);


http.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})

let kiosksConnected = 0;
io.on('connection', socket =>{
    kiosksConnected++

    socket.on('disconnect', ()=>{
        kiosksConnected--
        console.log('kiosk disconnected');
    })
});