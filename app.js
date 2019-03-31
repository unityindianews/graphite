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

 var bodyParser = require('body-parser')
 app.use( bodyParser.json() );       // to support JSON-encoded bodies
 app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
 }));
  
app.use('', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next();
});

MongoClient.connect(DB_config.DB_UIN_URL,{ useNewUrlParser: true }, function(err, dbConnection) {

    dbUIN.Connection=dbConnection; //connection object
    dbUIN.dbConnection = dbConnection.db();
    let dbConn=dbUIN.dbConnection;

    dbUIN.Admin = dbConn.collection('admin');
    dbUIN.List = dbConn.collection('list');

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
app.use('/list', require('./controllers/list'));

// port
app.set('port', PRT_config.port.address);
var server = app.listen(app.get('port'), function() {
    console.log(server.address().port);
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;