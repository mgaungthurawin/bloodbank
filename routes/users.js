var express = require('express');
var router = express.Router();

var auth_mdl = require('../middlewares/authenticate');
var session_store;

//index.js
var usercontroller = require('../controllers/usercontroller');
router.get('/', usercontroller.index);
router.get('/create', usercontroller.create)
router.post('/store', usercontroller.store)
router.get('/edit/(:id)', usercontroller.edit)
router.put('/:id/update', usercontroller.update)
router.delete('/:id/delete', usercontroller.destroy)

module.exports = router;








