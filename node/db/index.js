//node looks for an index.js first when requiring a directory

const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	}
};

