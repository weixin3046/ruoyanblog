var express = require('express');
var router = express.Router();
var User = require('../models/User');
//统一返回格式
var responseData;
router.use(function(req, res, next){
	responseData = {
		code: 0,
		message: ''
	};
	next();
});

router.post('/user/register', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	if( username == '' ) {
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData); //把数据返回给前端
		return;
	}
	if( password == '' ) {
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}
	User.findOne({
		username: username
	}).then(function(e){
		console.log(e);
		if(e){
			responseData.code = 3;
			responseData.message = '用户名已经注册';
			res.json(responseData);
			return;
		}
		//保存数据到数据库
		//实际工作中密码是以加密的方式保存
		var user = new User({
			username: username,
			password: password
		});
		return user.save();
	}).then(function(newinfo){
		console.log(newinfo);
		responseData.message = '注册成功';
		res.json();
	});
});

module.exports = router;