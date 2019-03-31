var express = require('express'),
 router = express.Router();
var mongo = require("mongodb");
var ObjectId = require('mongodb').ObjectId;


/* GET all list*/

router.get('/', function (req, res) {
   var query = {};
   req.dbUIN.List.find(query).sort({"last_modified": -1}).toArray(function(err,result){
       if(result){
            res.json({
                "result": result
            });
       }else{
        res.json({"error": err});
       }
   
   });
});

/* GET selected list */
router.get('/:id', function (req, res) {
    var query = {
        "_id":ObjectId(req.params.id)
    };
    req.dbUIN.List.find(query).toArray(function(err,result){
        if(result){
             res.json({
                 "result": result
             });
        }else{
         res.json({"error": err});
        }
    
    });
 });

 /* Add list */
 router.post('/', function (req, res) {
    var data = req.body;
    var addListData = {
        "name":data.name,
        "email":data.email,
        "phone":data.phone,
        "last_modified":new Date(),
        "active":1
    };
    req.dbUIN.List.insertOne(addListData, function (err, result) {
        if(result){
            res.json({
                "result":"success",
                "lastInsertedId":result.ops[0]._id
            });
            }else{
                res.json({"error": err});
            }
      });
 });

 /* update list */
 router.post('/:id/updates', function (req, res) {
    var updateTo = {
        "_id": new ObjectId(req.params.id)
    };
    var data = req.body;
    var updataListData = {
        "name":data.name,
        "email":data.email,
        "phone":data.phone,
        "last_modified":new Date()
    }
    req.dbUIN.List.updateOne(updateTo, {$set : updataListData},function(err, result){
        if(err){
            res.json({"error": err});
        }else{
            res.json({
                "result":"success",
                "lastInsertedId":req.params.id
            });
        }
    });
 });

  /* delete list */
    router.delete('/:id/:active/delete', function (req, res) {
        var updateTo = {
            "_id": new ObjectId(req.params.id)
        };
        var active = req.params.active==0?1:0;
        var deleteListData ={
            "active":active,
            "last_modified":new Date()
        }
        req.dbUIN.List.updateOne(updateTo, {$set : deleteListData},function(err, result){
            if(err){
                res.json({"error": err});
            }else{
                res.json({
                    "result":"success",
                    "lastInsertedId":req.params.id,
                    "active":active
                });
            }
        });
    });
 

module.exports = router;