//node looks for an index.js first when requiring a directory

const { Pool } = require('pg');

module.exports = {
  query: (text, params) => pool.query(text, params)
};

