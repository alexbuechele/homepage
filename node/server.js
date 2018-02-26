require('dotenv').config();

var app = require('./app');

//.env imports
const port = process.env.PORT || 3000;

app.listen(port, () => {console.log("Server Connected")});
