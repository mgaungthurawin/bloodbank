const index = function (req, res, next) {
	req.getConnection(function (err, connection) {
		var select_query = "SELECT * FROM location";
		var query = connection.query(select_query, function (err, rows) {
			if (err) 
				var error = ("Error Selecting : %s", err);
				req.flash('msg_error', error)
			res.render('location/index', {title: "Location", data: rows })
		})
	});
}

const create = function (req, res, next) {
	res.render('location/create', {title: "Add New Location"});
}

const store = function (req, res, next) {
	req.assert('name', 'Please fill the name').notEmpty();
	var errors = req.validationErrors()
	if (!errors) {

		var location = {
			name: req.body.name,
		}

		req.getConnection(function(err, connection) {
			var insert_query = "INSERT INTO location SET ?";
			var query = connection.query(insert_query, location, function (err, result) {
				if (err) {
					var error = ("Error Insert : %s", err);
					req.flash('msg_error', error)
					res.render('location/create', 
					{
						name: req.body.name,
					});
				} else {
					req.flash('msg_info', 'Create user success'); 
					res.redirect('/location');
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
		res.render('location/create', 
		{
			name: req.param('name')
		});
	}
}

const edit = function (req, res, next) {
	var select_query = "SELECT * FROM location WHERE id = " + req.params.id;
	req.getConnection(function(err, connection) {
		var query = connection.query(select_query, function (err, rows) {
			if (err) {
				var errors  = ("Error Selecting : %s ",err );  
				req.flash('msg_error', errors);
				res.redirect('/users')
			} else {
				if (rows.length <= 0) {
					req.flash('msg_error', "Location not found");
					res.redirect('/location');
				} else {
					res.render('location/edit', {title: "Edit Location", data: rows[0]});
				}
			}
		});
	})
}

const update = function (req, res, next) {
	req.assert('name', 'Please fill the name').notEmpty();
	var errors = req.validationErrors();
	if (!errors) {
		var location = {
			name : req.body.name
		}
		var update_query = "UPDATE location SET ? WHERE id = " +req.params.id;
		req.getConnection(function (err, connection) {
			var query = connection.query(update_query, location, function (err, result) {
				if (err) {
					var errors_detail  = ("Error Update : %s ",err );   
					req.flash('msg_error', errors_detail); 
					res.render('location/edit', 
					{ 
					 	name: req.param('name'),
					});
				} else {
					req.flash('msg_info', 'Update customer success');
					res.redirect('/location/edit/'+req.params.id);
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
		res.render('location', 
		{
			name: req.param('name')
		});
	}
}

const destroy = function (req, res, next) {
	var location = {
		id : req.params.id
	}

	var delete_query = "DELETE FROM location WHERE ?";
	req.getConnection(function (err, connection) {
		var query = connection.query(delete_query, location, function (err, result) {
			if (err) {
				var errors_detail  = ("Error Deleting : %s ",err );   
				req.flash('msg_error', errors_detail); 
				res.redirect('/location')
			} else {
				req.flash('msg_info', 'Delete Location Success'); 
				res.redirect('/location');
			}
		})
	})
}

module.exports = {
	index: index,
	create: create,
	store: store,
	edit: edit,
	update: update,
	destroy: destroy
}





