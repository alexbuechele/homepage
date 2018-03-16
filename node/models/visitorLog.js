db = require('../db');
const request = require('request')
// replace with request-promise

class VisitorLog {
    constructor (ipAddress) {
        this.ipAddress = ipAddress;
    }

    ip_api_helper(){
        var ip_api_string = ("http://ip-api.com/json/" + 
                            (this.ipAddress ? this.ipAddress : '') + 
                            "?fields=258047");

        request(ip_api_string, (err, response, body)=>{
            if (!err && response.statusCode == 200){
                //do something with response body
                this.ip_api_status = body["status"];
                this.country = body["country"];
                this.country_code = body["countryCode"];
                this.region = body["region"];
                console.log(this.region);
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
        // gosh this seems messy
        db.query("INSERT INTO visitor_logs (ipaddress, ip_api_status, " +
            "country, country_code, region, region_name, city, zipcode, " +
            "latitude, longitude, timezone, isp, org_name, as_name, mobile, proxy) "
                + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);",
                [this.ipAddress, this.ip_api_status, this.country, this.country_code, this.region, 
                this.region_name, this.city, this.zipcode, this.latitude, this.longitude, 
                this.timezone, this.isp, this.org_name, this.as_name, this.mobile, this.proxy],
            
            // fix this error handling
            (err, result) => {
                if (err){
                    console.log(err);
                }
            });
    }
};

module.exports = VisitorLog;
