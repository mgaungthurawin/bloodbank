var express = require('express');
var router = express.Router();

var session_store;

var locationcontroller = require('../controllers/locationcontroller');

router.get('/', locationcontroller.index);
router.get('/create', locationcontroller.create);
router.post('/store', locationcontroller.store);
router.get('/edit/:id', locationcontroller.edit);
router.put('/:id/update', locationcontroller.update);
router.delete('/:id/delete', locationcontroller.destroy);

module.exports = router;