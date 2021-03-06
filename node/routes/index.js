// node sees this file first when this directory required 
var router = require('express').Router();
//should i use 'new'?

var index_controller = require('../controllers/indexController');

//go to another route file same directory for dummy
router.use('/dummy', require('./dummy.js'));
router.use('/admin', require('./admin.js'));
//with a more complicated app, could have subdirectory with own index.js


//get request for home page
router.get('/', index_controller.index);
//should controllers also be split into subdirectory structure?
//does this structure make sense with routes and controllers vs just routes

//post request for contact form
router.post('/', index_controller.contact_me); //fix this when db is up and running
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