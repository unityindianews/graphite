var express = require('express');
var mongo = require("mongodb");
var dotenv = require('dotenv');
const envConfig = dotenv.config();

var app = express();

var DB_config = require('./config/database');
var PRT_config = require('./config/port');

var db = {};
var MongoClient = mongo.MongoClient;
var dbUIN = {};

MongoClient.connect(DB_config.DB_UIN_URL,{ useNewUrlParser: true }, function(err, dbConnection) {

    dbUIN.Connection=dbConnection; //connection object
    dbUIN.dbConnection = dbConnection.db();
    let dbConn=dbUIN.dbConnection;

    dbUIN.Admin = dbConn.collection('admin');
    console.log("UIN server Connected   " + new Date());
});
  
// expose global variables through the req object
app.use(function(req, res, next) {
  req.dbUIN = dbUIN;
    next();
})

// controllers
app.use('/', require('./controllers/index'));
app.use('/demo', require('./controllers/demo'));

// port
app.set('port', PRT_config.port.address);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;