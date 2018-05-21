const index = function (req, res, next) {
	req.getConnection(function (err, connection) {
		var select_query = 'SELECT * FROM blood_type';
		var query = connection.query(select_query, function(err, rows) {
			if (err)
				var error = ("Error Selecting : %s", err);
				req.flash('msg_error', error)
			res.render('bloodtype/index', {title: "Blood Type", data: rows })
		})
	})
}

const create = function (req, res, next) {
	res.render('bloodtype/create', {name : "", quantity: ""});
}

const store = function (req, res, next) {
	req.assert('name', 'Please fill the name').notEmpty();
	var errors = req.validationErrors()
	if (!errors) {
			v_name = req.sanitize('name').escape().trim();
			v_blood_type = req.sanitize('blood_type').escape().trim();
			v_quantity = req.sanitize('quantity').escape().trim();

		var blood_type = {
			name: v_name,
			blood_type: v_blood_type,
			quantity : v_quantity
		}

		req.getConnection(function (err, connection) {
			var insert_qry = "INSERT INTO blood_type SET ?";
			var query = connection.query(insert_qry, blood_type, function (err, result) {
				if (err){
					var error = ("Error Insert : %s", err);
					req.flash('msg_error', error)
					res.render('bloodtype/create', 
					{
						name: req.param('name'),
						blood_type: req.param('blood_type'),
					});
				} else {
					req.flash('msg_info', 'Create blood type success'); 
					res.redirect('/bloodtype');
				}
			})
		})
	} else {
		errors_detail = "Sorry there are error<ul>";
		for(i in errors) {
			errors = errors[i];
			errors_detail += '<li>'+errors.msg+'</li>';
		}
		errors_detail += "</ul>";
		req.flash('msg_error', errors_detail);
		res.render('bloodtype/create', 
		{
			name: req.param('name'), 
			address: req.param('quantity')
		});
	}
}

const edit = function (req, res, next) {
	req.getConnection(function (err, connection) {
		var select_query = 'SELECT * FROM blood_type WHERE id = ' + req.params.id;
		var query = connection.query(select_query, function (err, rows) {
			if (err) {
				var error  = ("Error Selecting : %s ",err );  
				req.flash('msg_error', errors);
				res.redirect('/bloodtype')
			} else {
				if (rows.length <= 0) {
					req.flash('msg_error', "Blood type not found");
					res.redirect('/bloodtype');
				} else {
					console.log(rows);
					res.render('bloodtype/edit', {title : "Edit", data: rows[0]})
				}
			}
		})
	})
}

const update = function (req, res, next) {
	req.assert('name', 'Please fill the name').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
			v_name = req.sanitize('name').escape().trim();
			v_blood_type = req.sanitize('blood_type').escape().trim();
			v_quantity = req.sanitize('quantity').escape().trim();

		var blood_type = {
			name: v_name,
			blood_type: v_blood_type,
			quantity : v_quantity
		}
		var update_query = "UPDATE blood_type SET ? WHERE id=" + req.params.id;
		req.getConnection(function (err, connection) {
			var query = connection.query(update_query, blood_type, function (err, result) {
				if (err) {
					var errors_detail  = ("Error Update : %s ",err );   
					req.flash('msg_error', errors_detail); 
					res.render('bloodtype/edit', 
					{ 
					 	name: req.param('name'), 
					 	address: req.param('blood_type'),
					 	email: req.param('quantity'),
					});
				} else {
					req.flash('msg_info', 'Update blood type success');
					res.redirect('/bloodtype/edit/'+req.params.id);
				}
			})
		})
	} else {
		console.log(errors)
		errors_detail = "Sorry there are error<ul>";
		for(i in errors) {
			errors = errors[i];
			errors_detail += '<li>'+errors.msg+'</li>';
		}
		errors_detail += "</ul>";
		req.flash('msg_error', errors_detail);
		res.render('bloodtype/create', 
		{
			name: req.param('name')
		});
	}
}

const destroy = function(req, res, next) {
	req.getConnection(function (err, connection) {
		var blood_type = {
			id : req.params.id
		}
		var delete_query = "DELETE FROM blood_type WHERE ?";
		var query = connection.query(delete_query, blood_type, function (err, result) {
			if (err) {
				var errors_detail  = ("Error Update : %s ",err );   
				req.flash('msg_error', errors_detail); 
				res.redirect('/bloodtype')
			} else {
				req.flash('msg_info', 'Delete Blood Type Success'); 
				res.redirect('/bloodtype');
			}
		})
	})
}

module.exports = {
	index : index,
	create: create,
	store: store,
	edit: edit,
	update: update,
	destroy: destroy
}




