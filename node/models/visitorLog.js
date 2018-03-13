db = require('../db');

class VisitorLog {
    constructor (ipAddress) {
        this.ipAddress = ipAddress;
    }

    save() {
        db.query("INSERT INTO visitor_logs (ipaddress) "
                + "VALUES ($1);",
                [this.ipAddress],
            
            // fix this error handling
            (err, result) => {
                if (err){
                    console.log(err);
                }
            });
    }
};

module.exports = VisitorLog;
