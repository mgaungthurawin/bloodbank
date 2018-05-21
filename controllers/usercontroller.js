const index = function(req, res, next) {
	req.getConnection(function(err, connection) {
		var query = connection.query('SELECT * FROM users', function (err, rows) {
			if (err) 
				var error = ("Error Selecting : %s", err);
				req.flash('msg_error', error)
			res.render('users/index', {title: "User", data: rows })
		})
	})
}

const create = function (req, res, next) {
	res.render( 'users/create', 
	{ 
	 	title: 'Add New User',
	 	name: '',
	 	email: '',
	 	user_type:'',
	});
}

const store = function (req, res, next) {
	req.assert('name', 'Please fill the name').notEmpty();
	var errors = req.validationErrors()
	if (!errors) {

		var insert_sql = "INSERT INTO users (`name`, `email`, `user_type`, `password`) VALUES ('"+req.body.name+"', '"+req.body.email+"', '"+req.body.user_type+"'), md5('"+req.body.password+"')";
		req.getConnection(function (err, connection) {
			var query = connection.query(insert_sql, function (err, result) {
				if (err) {
					var error = ("Error Insert : %s", err);
					req.flash('msg_error', error)
					res.render('users/add-user', 
					{
						name: req.body.name,
						email: req.body.email,
						user_type : req.body.user_type
					});
				} else {
					req.flash('msg_info', 'Create user success'); 
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
		res.render('users/create', 
		{
			name: req.param('name'), 
			address: req.param('address')
		});
	}
}

const edit = function (req, res, next) {
	req.getConnection(function(err, connection) {
		var query = connection.query("SELECT * FROM users where id = " +req.params.id, function (err, rows) {
			if (err) {
				var error  = ("Error Selecting : %s ",err );  
				req.flash('msg_error', errors);
				res.redirect('/users')
			} else {
				if (rows.length <= 0) {
					req.flash('msg_error', "User not found");
					res.redirect('/users');
				} else {
					console.log(rows);
					res.render('users/edit', {title : "Edit", data: rows[0]})
				}
			}
		});
	});
}

const update = function (req, res, next) {
	req.assert('name', 'Please fill the name').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {

		var user = {
			name: req.body.name,
			email: req.body.email,
			user_type : req.body.user_type
		}

		var update_sql = 'UPDATE users SET name = "'+req.body.name+'", email = "'+req.body.email+'", user_type = "'+req.body.user_type+'", password = md5("'+req.body.password+'") WHERE id=' +req.params.id;
		req.getConnection(function(err, connection) {
			var query = connection.query(update_sql, user, function (err, result) {
				if (err) {
					var errors_detail  = ("Error Update : %s ",err );   
					req.flash('msg_error', errors_detail); 
					res.render('user/edit', 
					{ 
						name: req.body.name,
						email: req.body.email,
						user_type: req.body.user_type,
					});
				} else {
					req.flash('msg_info', 'Update customer success');
					res.redirect('/users/edit/'+req.params.id);
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
		res.render('users/create', 
		{
			name: req.param('name'), 
			 address: req.param('address')
		});
	}
}

const destroy = function (req, res, next) {
	req.getConnection(function (err, connection) {
		var user = {
			id : req.params.id
		}
		var delete_query = "DELETE FROM users WHERE ?";
		var query = connection.query(delete_query, user, function (err, result) {
			if (err) {
				var errors_detail  = ("Error Update : %s ",err );   
				req.flash('msg_error', errors_detail); 
				res.redirect('/users')
			} else {
				req.flash('msg_info', 'Delete User Success'); 
				res.redirect('/users');
			}
		})
	})
}

module.exports = {
	index: index,
	create: create,
	store:store,
	edit:edit,
	update: update,
	destroy: destroy
}






