var express = require('express');
var router = express.Router();

var auth_mdl = require('../middlewares/authenticate');
var session_store;

var bloodseekercontroller = require('../controllers/bloodseekercontroller');
router.get('/', bloodseekercontroller.index);

module.exports = router;