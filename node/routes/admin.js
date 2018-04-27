var router = require('express').Router();

var admin_controller = require('../controllers/adminController');

router.get('/', admin_controller.admin);

module.exports = router;

