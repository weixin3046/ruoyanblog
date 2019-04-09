var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	// res.send('首页');
	console.log(req)
	res.render('main/index');
});

module.exports = router;