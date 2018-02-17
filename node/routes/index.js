var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/indexController');

//get request for the home page
router.get('/', index_controller.index);

// post request for contact form
router.post('/', index_controller.contact_me);

module.exports = router;


/*----TODO this version with express-promise-router

var Router = require('express-promise-router');
var router = new Router();

var db = require('../db');

router.get('/', async (req, res) => {
	db.post();
});

module.exports = router;

*/