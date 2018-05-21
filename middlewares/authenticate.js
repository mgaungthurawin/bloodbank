var Auth = 
{ 
	is_login: function (req, res, next) 
	{ 
		// if (!req.session.is_login) 
		// {
		// 	return res.redirect('/login'); 
		// }

		if (!req.session.user) {
			return res.redirect('/login'); 
		}
		
		if (req.session.user.user_type == 2) {
			return res.redirect('/donar');
		} 

		if (req.session.user.user_type == 3) {
			return res.redirect('/bloodseeker');	
		}

		next(); 
	},
}; 

module.exports = Auth;