const index = function (req, res, next) {
	res.render('frontend/index', { title: 'Express' });
}

const donarRegister = function (req, res, next) {
	res.render('frontend/donarRegister', {title: "Register as donar"});
}

const login = function (req, res, next) {
	res.render('auth/login', {title: 'Login'});
}

const postlogin = function (req, res, next) {
	session_store = req.session;
	req.assert('email', 'Please fill the Username').notEmpty();
	req.assert('email', 'Email not valid').isEmail();
	req.assert('password', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();

	if (!errors) {
		req.getConnection(function (err, connection) {
			v_pass = req.sanitize( 'password' ).escape().trim(); 
			v_email = req.sanitize( 'email' ).escape().trim();
			var select_query = 'SELECT * from users where email="'+v_email+'" and password=md5("'+v_pass+'")';
			var query = connection.query(select_query, function(err, rows) {
				if (err) {
					var err  = ("Error Selecting : %s ",err.code );  
					console.log(err.code);
					req.flash('msg_error', err); 
					res.redirect('/login'); 
				} else {
					if (rows.length <= 0) {
						req.flash('msg_error', "Wrong email address or password. Try again."); 
						res.redirect('/login');
					} else {
						session_store.is_login = true;
						session_store.userId =rows[0].id;
						session_store.user =rows[0];
						res.redirect('/users');
					}
				}
			})	
		})
		
	} else {
		errors_detail = "Sory there are error<ul>";
		for (i in errors) 
		{ 
			error = errors[i]; 
			errors_detail += '<li>'+error.msg+'</li>'; 
		} 
		errors_detail += "</ul>"; 
		console.log(errors_detail);
		req.flash('msg_error', errors_detail); 
		res.redirect('/login'); 
	}
}

const register = function (req, res, next) {
	res.render('auth/register', {title: 'Register'})
}

const postregister = function (req, res, next) {
	session_store = req.session;
	req.assert('email', 'Please fill the Username').notEmpty();
	req.assert('email', 'Please fill the Username').notEmpty();
	req.assert('email', 'Email not valid').isEmail();
	req.assert('password', 'Please fill the Password').notEmpty();
	var errors = req.validationErrors();

	if (!errors) {

		v_name = req.sanitize('name').escape().trim();
		v_email = req.sanitize( 'email' ).escape().trim();
		v_phone = req.sanitize( 'phone' ).escape().trim();
		v_password = req.sanitize( 'password' ).escape().trim(); 
		v_user_type = req.sanitize('user_type').escape().trim();

		var user = {
			name: v_name,
			email: v_email,
			phone : v_phone,
			user_type : v_user_type
		}

		req.getConnection(function (err, connection) {
			var insert_query = "INSERT INTO users (`name`, `email`, `phone`, `user_type`, `password`) values ('"+v_name+"', '"+v_email+"', '"+v_phone+"','"+v_user_type+"', md5('"+v_password+"'))";
			var query = connection.query(insert_query, function (err, result) {
				if (err) {
					var error = ("Error Insert : %s", err);
					req.flash('msg_error', error)
					res.render('auth/register', 
					{
						name: req.param('name'),
						email: req.param('email'),
						phone: req.param('phone'),
						user_type: req.param('user_type'),	
					});
				} else {
					var select_query = "SELECT * FROM users where id = " + result.insertId;
					var query = connection.query(select_query, function (err, rows) {
						session_store.is_login = true;
						session_store.userId =rows[0].id;
						session_store.user =rows[0];
					})
					res.redirect('/users');
				}
			})
		})
	} else {
		console.log(errors)
		errors_detail = "Sorry there are error<ul>";
		for(i in errors) {
			errors = errors[i];
			errors_detail += '<li>'+error.msg+'</li>';
		}
		errors_detail += "</ul>";
		req.flash('msg_error', errors_detail);
		res.render('auth/login', 
		{
			name: req.param('name')
		});
	}

}

const logout = function (req, res, next) {
	req.session.destroy(function(err) {
		if (err) {
			console.log(err)
		} else {
			res.redirect('/login'); 
		}
	})
}

module.exports = {
	index: index,
	login: login,
	postlogin: postlogin,
	register: register,
	postregister: postregister,
	donarRegister: donarRegister,
	logout: logout
}





