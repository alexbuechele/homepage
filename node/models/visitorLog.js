db = require('../db');
const request = require('request')
// replace with request-promise

class VisitorLog {
    constructor (ipAddress) {
        this.ipAddress = ipAddress;
    }

    ip_api_helper(){
        ip_api_string = "http://ip-api.com/json/" + this.ipAddress + "?fields=258047";
        request(ip_api_string, (err, response, body)=>{
            if (!err && response.statusCode == 200){
                //do something with response body
                this.ip_api_status = body["status"];
                this.country = body["country"];
                this.country_code = body["countryCode"];
                this.region = body["region"];
                this.region_name = body["regionName"];
                this.city = body["city"];
                this.zipcode = body["zip"];
                this.latitude = body["lat"];
                this.longitude = body["lon"];
                this.timezone = body["timezone"];
                this.isp = body["isp"];
                this.org_name = body["org"];
                this.as_name = body["as"];
                this.mobile = body["mobile"];
                this.proxy = body["proxy"];
            }
            else if (err){
                console.log(err);
            }
            else {
                console.log(response.statusCode);
            }
        });

    }

    save(){
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
