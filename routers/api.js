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

//用户注册
router.post('/user/register', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if( username == '' || username == undefined ) {
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData); //把数据返回给前端
		return;
	}
	if( password == '' || password == undefined) {
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}
	//查询数据库
	User.findOne({
		username: username
	}).then(function(e){
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
		responseData.code = 200;
		responseData.message = '注册成功';
		//更新数据库
		return user.save().then(function(newinfo){
			responseData.newinfo = newinfo;
			res.json(responseData);
			return;
		});
	})
});
//用户登录
router.post('/user/login',function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if( username == '' || username == undefined ) {
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData); 
		return;
	}
	if( password == '' || password == undefined) {
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}
	//查询数据库
	User.findOne({
		username: username,
		password: password
	}).then(function(e){
		if(e){
			responseData.code = 200;
			responseData.message = '登录成功';
			res.json(responseData);
			return;
		}else{
			responseData.code = 0;
			responseData.message = '用户名或密码错误';
			res.json(responseData);
		}
	})

});
// 设置管理员 //未完成的需求
router.post('/setting/admin', function(req, res) {
	var username = req.body.username;
	var isAdmin = req.body.isAdmin;
	console.log(req.body)
	User.replaceOne(
		{name: username}
    	).then(function(e){
		console.log(e)
		responseData.newinfo = newinfo;
		responseData.code = 200;
		responseData.message = '修改成功';
		res.json(responseData);
	})
	// User.findOne({
	// 	username: username
	// }).then(function(e) {
	// 	console.log(e)
	// 	if(e) {
	// 		var user = new User({
	// 			username: username,
	// 			isAdmin: isAdmin
	// 		});
	// 		return user.update().then(function(newinfo){
	// 			responseData.newinfo = newinfo;
	// 			responseData.code = 200;
	// 			responseData.message = '修改成功';
	// 			res.json(responseData);
	// 			return;
	// 		});
	// 	}
	// 	responseData.code = 0;
	// 	responseData.message = '没有此用户';
	// 	res.json(responseData);
	// })
})


module.exports = router;