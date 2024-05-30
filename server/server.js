const express = require('express');
const app = express();
const { Server } = require('http');
const path = require('path');
const http = require('http').Server(app);
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://stijnsepter:a8S3ijniJB3ELTxn@cbroefenexamen.ksykwxl.mongodb.net/?retryWrites=true&w=majority&appName=CBRoefenexamen';
let db = undefined;

app.use(express.static('client'))
const hostname = 'localhost';
const port = process.env.PORT||8181;

//attach http server to the socket io
const io = new Server(app);

http.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})

let Connected = 0;
io.on('connection', socket =>{
    Connected++
    console.log('Connected to' + Connected);
    socket.on('disconnect', ()=>{
        Connected--
        console.log('CBR_examen disconnected');
    })
});