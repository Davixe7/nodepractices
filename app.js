var express = require('express'),
	pug = require('pug'),
	fm = require('express-formidable'),
	User = require('./models/user');

var app = express();
app.set('view engine', 'pug');
app.use(fm({keepExtensions: true}));

app.get('/', function(req, res){
	User.find(function(err, usuarios){
		if(err){
			console.log(err);
		}
		res.render("index", {usuarios:usuarios});
	});
});

app.get('/resetAll', function(req, res){
	User.remove(function(err, usuarios){
		if(err){
			console.log(err);
		}
		res.redirect("/");
	});
});

app.get('/login', function(req, res){
	res.render("login");
});

app.get('/signup', function(req, res){
	res.render("signup");
});

app.post('/users', function(req, res){
	var user = new User({username:req.fields.username, email: req.fields.email, password: req.fields.password, password_2: req.fields.password_2});
	
	user.save(function(err, user){
		if(err){
			console.log("usuario no registrado exitosamente");
			console.log(String(err));
			res.render('signup');
		}else{
			console.log("usuario " + user._id + " registrado exitosamente");
			res.render('login');
		}
	});
		
});

app.listen(8080);