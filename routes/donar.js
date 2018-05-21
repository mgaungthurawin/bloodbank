var express = require('express');
var router = express.Router();

var auth_mdl = require('../middlewares/authenticate');
var session_store;

var donarcontroller = require('../controllers/donarcontroller');
router.get('/', donarcontroller.index);

module.exports = router;