var Router = require('express-promise-router');

var db = require('../db');

var router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
	db.post()

});