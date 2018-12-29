//加载模块
var express = require('express');
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');

//加载body-parser，用来处理提交过来的数据
var bodyParser = require('body-parser');

//创建app应用 => NodeJS Http.createServer();
var app = express();

//设置静态文件托管;
//当访问的url以/public开始 他会直接返回__dirname + '/piblic'下的文件
/**
 * express.static（root，[options]）
 * root参数指定从中提供静态资产的根目录。该函数通过req.url与提供的root目录组合来确定要提供的文件。当找不到文件时，它不是发送404响应，而是调用next() 继续下一个中间件，允许堆叠和回退。
 * options属性查看地址http://www.expressjs.com.cn/4x/api.html#express.static
 *var options = {
 *dotfiles: 'ignore',
 *etag: false,
 *extensions: ['htm', 'html'],
 *index: false,
 *maxAge: '1d',
 *redirect: false,
 *setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))
 */
app.use('/public', express.static(__dirname + '/public'));

//配置应用模板
// 定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀
app.engine('html', swig.renderFile);
//设置模板文件存放的目录 第一个参数必须是views，第二个参数是目录
//app.set（名称，值）
app.set('views', './views');
//注册模板，第一个参数必须是view engine，第二个参数和app.engine这个方法定义的模板引擎名称一致
app.set('view engine', 'html');
//取消模板缓存
swig.setDefaults({
    cache: false
});


//bodyParser设置
app.use( bodyParser.urlencoded({extended: true}));

/**
 * 首页
 *  req request对象
 *  res response对象
 *  next 函数
 */
/**
 * 读取views目录下的指定文件 解析给客户端
 * 第一个参数表示模板的文件 相对于views目录
 * 第二个参数，传递模板使用的数据
 */
// app.get('/', function(req, res, next) {
//     res.send('<h1>这是我的第一个博客</h1>');
//     res.render('index');
// });

/**
 * 第一个参数匹配以'/admin'开头的路径（这里路径说的是客户端）
 * 第二个参数是路径匹配后执行的功能
 */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));



// app.get('/main.css', function(req, res, next) {
// 	res.setHeader('content-type', 'text/css');
// 	res.send("body {background: red;}");
// });

//链接数据库
mongoose.connect('mongodb://localhost:27018/blog', function(err) {
    if (err) {
        console.log('链接失败');
    } else {
        console.log('链接成功');
        //监听http请求
		app.listen(8081);
    }
});


