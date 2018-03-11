db = require('../db');

class MessageLog {
    constructor (name, email, message, ipAddress) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.ipAddress = ipAddress;
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
    /*
    tableInit() {
        db.query("CREATE TABLE IF NOT EXISTS messagelogs ("
            + "id SERIAL PRIMARY KEY, "
            + "name varchar(45), "
            + "email varchar(45), "
            + "message text, "
            + "ipaddress varchar(45), "
            + "datetime timestamp default date_trunc('second', now())"
            + ");",
            [],
            (err, result) => {
                if (err) {
                    console.log("table initialization error");
                }              
            });
    }

    

    */
};

module.exports = MessageLog;
