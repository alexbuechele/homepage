db = require('../db');

class MessageLog {
    constructor (name, email, message, ipAddress) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.ipAddress = ipAddress;
    }

    save() {
        db.query("INSERT INTO message_logs (name, email, message, ipaddress) "
                + "VALUES ($1, $2, $3, $4);",
                [this.name, this.email, this.message, this.ipAddress],
            
            //    [this.name, this.email, this.message, this.ipAddress], 
            (err, result) => {
                if (err){
                    console.log(err);
                }
            });
    }
};

module.exports = MessageLog;
