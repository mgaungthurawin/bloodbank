var express = require('express');
var router = express.Router();

var session_store;

var authcontroller = require('../controllers/authcontroller');
router.get('/', authcontroller.index);
router.get('/login', authcontroller.login);
router.post('/login', authcontroller.postlogin)
router.get('/donarRegister', authcontroller.donarRegister)


router.get('/register', authcontroller.register)
router.post('/register', authcontroller.postregister)
router.get('/logout', authcontroller.logout)

module.exports = router;









