const express = require('express');
const app = express();
const { Server } = require('http');
const path = require('path');
const http = require('http').Server(app);
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://stijnsepter:a8S3ijniJB3ELTxn@cbroefenexamen.ksykwxl.mongodb.net/?retryWrites=true&w=majority&appName=CBRoefenexamen';
const _ = require('lodash');
const fs = require("fs");
const {request} = require("express");
let db = undefined;

app.use(express.static('client'))
const hostname = 'localhost';
const port = process.env.PORT||6969;

//attach http server to the socket io
const io = require('socket.io')(http);

http.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})

let Connected = 0;
io.on('connection', socket =>{
    Connected++
    console.log('Exams Connected ' + Connected);

    socket.on('getQuestions', request=>{
        console.log(request)

        let questions = loadJson(`server/database/vragen_${request.type}_${request.language}.json`);
        let timedQuestions = _.filter(questions, {'type':"1"})
        let timedQuestionsSample = _.sampleSize(timedQuestions, 25)

        questions = _.reject(questions, {'type':"1"})
        let questionsSample = _.sampleSize(questions, 25)

        const testData = {
            'id':null,
            'questions':{
                'timed':timedQuestionsSample,
                'default':questionsSample,
            }
        }
        socket.emit('questionData', {testData})
    })

    socket.on('disconnect', ()=>{
        Connected--
        console.log('CBR_examen disconnected');
    })
});

function loadJson(filePath) {
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonString);
}
