require('dotenv').config()

const express = require('express');
const app = express();

//.env imports
const port = process.env.PORT || 3000;
const dbusername = ;
const dbpassword = ;
const dbserver = ;
const dbport = ;
const dbname = ;

app.use(function (req, res, next){
	//req.headers["x-real-ip"] gives their ip address
	next();
});


app.use(express.static("./public"));


app.listen(port, () => {console.log("Server Connected")});
