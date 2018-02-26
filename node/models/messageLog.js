db = require('../db');

class MessageLog {
    constructor (req) {
        name = req.body.name;
        email = req.body.email;
        message = req.body.email;
        ipAddress = req.headers["x-real-ip"];
    }

    save(callback) {
        db.query("INSERT INTO messagelogs (name, email, message, ipaddress) "
                + "VALUES ($1, $2, $3, $4);",
            [this.name, this.email, this.message, this.ipAddress], 
            callback(err));
    }

    //callback in this one with err?
    tableInit() {
        db.query("CREATE TABLE messagelogs ("
            + "id SERIAL PRIMARY KEY "
            + "name "
            + "email "
            + "message "
            + "ipaddress "
            + ");",
            (err) => {
                if (err) {
                    console.log("table initialization error");
                }              
            });
    }
};

module.exports = MessageLog;

//pseudocode until i have net access :s