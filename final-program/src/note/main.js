const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const cors = require('cors');
const mon = require('./mongo');
const routes = require("./routes")
var bodyParser = require('body-parser');
var fs = require('fs');


// gotta load in MONGO_URL before `mongo.connect()`
require('dotenv-defaults').config();
//require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

mon.connect();

const server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});
