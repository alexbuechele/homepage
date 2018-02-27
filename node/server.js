require('dotenv').config();

(function tableInitiations(){
    messageRef = require('./models/messageLog');
    myMessageRef = new messageRef;
    myMessageRef.tableInit();
})();

var app = require('./app');

//.env imports
const port = process.env.PORT || 3000;

app.listen(port, () => {console.log("Server Connected")});
