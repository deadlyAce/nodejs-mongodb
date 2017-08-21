var express = require('express');
var qs = require("querystring");
var router = express.Router();


/* GET home page. */
router.get('/',function(req,res,next){
	res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login',{message:"",count:"0"});
});


router.get('/register', function(req, res, next) {
  res.render('register');
});



//监听登录界面所输入的数据情况
router.post('/login', function (req,res) {
  	var name =req.body.user;
    var pass =req.body.pass;       
        userdb.find({'username':name},function(err,docs){  
        	    var hasProp = false;  
				    for (var prop in docs){  
				        hasProp = true;  
				        break;  
				    }
				    if (hasProp){
				    	if(docs[0].count<=5){
				    		if(pass==docs[0].password){
					    	req.session.user=name;
		        			req.session.isLogin=true;
		        			userdb.update({'username':name},{$set:{count:'0'}},function(err){});
		        			if(docs[0].role=="manege"){
		        				res.render('mamege');
		        			}else{
							    res.redirect('/');
		        			}
					    	}else{
					    		docs[0].count++;
					    		userdb.update({'username':name},{$set:{count:docs[0].count}},function(err){});
					    		res.render('login',{message:"输入的密码不正确",count:docs[0].count});
					    	}
				    	}else{
				    		res.render('login',{message:"你已经连续输入错误超过5次，账号已经被锁定。请联系管理员：*********",count:"0"});
				    	}
				    }else{  
				    	res.render('login',{message:"输入的用户名不存在",count:"0"});
				    } 
	  }); 

});


//监听注册界面所输入的数据情况，并存入数据库

router.post('/register', function(req, res) {
    var name =req.body.user;
    var pass =req.body.pass;
    var num=req.body.num;
	var emal=req.body.email;
	var nation=req.body.nation;
	var interest=req.body.interest;
	var gender=req.body.optionsRadios;
	var role="General";
    if (name && pass) {
        var Newdb = new userdb({
            username: name,
            password: pass,
            classnumber:num,
            email:emal,
            nation:nation,
            interest:interest,
            gender:gender,
            count:0,
            role:role
        });
         userdb.find({'username':name},function(err,docs){  
        	if(docs[0]){
        		res.send("用户名已经存在请重新登录！");
        	}
        	else{
        		   Newdb.save(function (err) {
		            if (err) {
		                console.error(err);
		                return;
		            }
        			});
        			res.redirect('/login');
        	}
	  }); 
    }
    else{
    	res.send("输入为空，请重新输入");
    }

});



//监听首页要提交的数据
router.post('/question', function (req,res) {
	var name=req.session.user;
	var content=req.body.content;
	var time=req.body.time;
	if(name!=undefined &&content&&time){
		var NewQuestion=new questiondb({
			username:name,
			question:content,
			time:time
		});
		NewQuestion.save(function (err) {
		            if (err) {
		                console.error(err);
		                return;
		            }
        			});
	}
  	res.send('success');
});

//监听首页要查询的数据
router.get('/find', function (req,res) {
	var content=req.query.content;
	questiondb.find({'question':content},function(err,docs){ 
     	 res.send(docs);
	 }); 
});

//监听首页要修改的用户数据
router.post('/userinfoUpdate', function (req,res) {
	userdb.update({'username':req.body.user},{$set:{username:req.body.user,password:req.body.pass,classnumber:req.body.num,email:req.body.email,nation:req.body.nation,interest:req.body.interest,gender:req.body.gender,count:0}},function(err){});
	res.end();
});

//向前台返回当前session数据的请求
router.get('/session', function (req,res) {
    res.send(req.session);
});


//向前台返回当前用户提问问题数据的请求
router.get('/Myquestion', function (req,res) {
     questiondb.find({'username':req.session.user},function(err,docs){ 
     	 res.send(docs);
	  }); 
});

//向前台返回所有问题数据的请求
router.get('/Allquestion', function (req,res) {
     questiondb.find({},function(err,docs){ 
     	 res.send(docs);
	  }); 
});

//返回当前用户的信息
router.get('/userinfo', function (req,res) {
     userdb.find({'username':req.session.user},function(err,docs){
     	 res.send(docs);
	  }); 
});

//返回当前查询的用户信息
router.get('/userconment', function (req,res) {
     userdb.find({'username':req.body.username},function(err,docs){
     	 res.send(docs);
	  }); 
});


//监听首页退出账号的操作，即要清除session数据
router.post('/loginout', function (req,res) {
	req.session.user=undefined;
   	req.session.isLogin=false;
   	res.send('success');
});

//首页更新密码
router.post('/update-pass', function (req,res) {
	var oldpass=req.body.oldpass;
	var newpass=req.body.newpass;
	userdb.find({'username':req.session.user},function(err,docs){  
        	if(oldpass!=docs[0].password){
        		data={messege:"输入的密码错误!"};
        		res.send(data);
        	}
        	else{
        		userdb.update({'username':req.session.user},{$set:{password:newpass}},function(err){});
        	}
	  }); 
});



var totalPageNum,
    onePageNum = 6;

router.get('/page',
function (req, res, next) {
    questiondb.find({}, function (err, items) {
    totalPageNum = Math.ceil(items.length / onePageNum);
    next();
    });
},
 function (req, res) {
   var currentPageNum = req.query.page;

   if (currentPageNum < 1) {
       currentPageNum = 1;
   }

   if (currentPageNum > totalPageNum) {
      currentPageNum = totalPageNum; 
   }

   questiondb
    .find({})
    .skip((currentPageNum - 1) * onePageNum)  
    .limit(onePageNum)
   .exec(function (err, items) {
        res.json(items);
   });   


});





module.exports = router;