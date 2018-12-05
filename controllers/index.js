var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res) {
  console.log('hi');
	res.json({
		"status": "success for welcome app"
	});
});

module.exports = router;
