const express = require('express');
const path = require('path');

//initialaze the server
const api = express();

//middleware
api.use(express.static(path.join(__dirname, 'public')));

api.use('/', express.static('index.html'));

module.exports = api;