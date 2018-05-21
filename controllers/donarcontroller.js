const index = function (req, res, next) {
	res.render('donar/dashboard', {title : "Donar"});
}

module.exports = {
	index: index
}