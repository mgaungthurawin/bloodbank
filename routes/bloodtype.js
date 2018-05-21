var express = require('express');
var router = express.Router();

var auth_mdl = require('../middlewares/authenticate');
var session_store;

var bloodtypecontroller = require('../controllers/bloodtypecontroller')
router.get('/', auth_mdl.is_login, bloodtypecontroller.index)
router.get('/create', auth_mdl.is_login, bloodtypecontroller.create)
router.post('/store', auth_mdl.is_login, bloodtypecontroller.store)
router.get('/edit/(:id)', auth_mdl.is_login, bloodtypecontroller.edit)
router.put('/:id/update', auth_mdl.is_login, bloodtypecontroller.update)
router.delete('/:id/delete', auth_mdl.is_login, bloodtypecontroller.destroy)

module.exports = router;








