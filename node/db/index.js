//node looks for an index.js first when requiring a directory

const { Pool, Client } = require('pg');

const pool = new Pool();
//uses environment variables to connect


//put query logging, client leak diagnostics here
module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	}
};

