var express = require('express');
var router = express.Router();

var dummy_controller = require('../controllers/dummyController');

//get request for the home page
router.get('/', dummy_controller.dummy);


module.exports = router;