var express = require('express');
var router = express.Router();
var User = require('../models/User');
//统一返回格式
var responseData;
router.use(function(req, res, next){
	//只有中间件有req, res, next这三个参数
	//req代表客户端请求
	//res代表服务端响应
	//响应下一个中间件next()
	//如果有 2 个或 3 个参数,头两个参数是请求和响应对象,第三个参数是 next 函数。如果有 4 个参数,它就变成了错误处理中间件,第一个参数变成了错误对象,然后依次是请求、响应和 next 对象
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