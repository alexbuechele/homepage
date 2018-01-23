const express = require('express');
const app = express();


app.use(function (req, res, next){
	//req.headers["x-real-ip"] gives their ip address
	next();
});


app.use(express.static("./public"));


app.listen(3000, () => {console.log("Server Connected")});
