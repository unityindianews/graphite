var express = require('express'),
 router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;

/* GET home page. */

router.get('/', function (req, res) {

   var query = {};
   req.dbUIN.Admin.find(query).toArray(function(err,result){
    console.log(result);
   });

});

module.exports = router;