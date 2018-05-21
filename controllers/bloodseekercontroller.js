const index = function (req, res, next) {
	res.render('bloodseeker/index', {title : "Blood Seeker"});
}

module.exports = {
	index: index
}