const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const {DATABASE,PORT} = require('./config/config');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')

const todo = require('./routes/todo');

mongoose.Promise = global.Promise;

mongoose.connect(DATABASE, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected')
    }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'client/build')));

//todo route
app.use('/todos', todo);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.listen(PORT, (err) => {
    if (err) console.log("err");

    console.log("port started");
})