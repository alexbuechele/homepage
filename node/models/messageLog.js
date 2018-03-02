db = require('../db');

class MessageLog {
    constructor () {
        this.name = '';
        this.email = '';
        this.message = '';
        this.ipAddress = '';
    }

    populate (req) {
        this.name = req.body.name;
        this.email = req.body.email;
        this.message = req.body.email;
        this.ipAddress = req.headers["x-real-ip"];
    }


    save(callback) {
        db.query("INSERT INTO messagelogs (name, email, message, ipaddress) "
                + "VALUES ($1, $2, $3, $4);",
            [this.name, this.email, this.message, this.ipAddress], 
            (err, result) => {
                callback(err, result);
            });
    }

    //callback in this one with err?
    tableInit() {
        db.query("CREATE TABLE IF NOT EXISTS messagelogs ("
            + "id SERIAL PRIMARY KEY "
            + "name varchar(45) "
            + "email varchar(45) "
            + "message text"
            + "ipaddress varchar(45)"
            + ");",
            [],
            (err, result) => {
                if (err) {
                    console.log("table initialization error");
                }              
            });
    }
};

module.exports = MessageLog;

//pseudocode until i have net access :s