db = require('../db');
var rpn = require('request-promise-native');


class VisitorLog {
    constructor (ipAddress) {
        this.ipAddress      = ipAddress;
        this.ip_api_status  = null;
        this.country        = null;
        this.country_code   = null;
        this.region         = null;
        this.region_name    = null;
        this.city           = null;
        this.zipcode        = null;
        this.latitude       = null;
        this.longitude      = null;
        this.timezone       = null;
        this.isp            = null;
        this.org_name       = null;
        this.as_name        = null;
        this.mobile         = null;
        this.proxy          = null;
    }

    ip_api_helper(){
        //return new Promise(){ etc...
        
        return new Promise((resolve, reject) => {
            var ip_api_string = ("http://ip-api.com/json/" + 
                            (this.ipAddress ? this.ipAddress : '') + 
                            "?fields=258047");
            
            
        })
        
        
                      
        rpn(ip_api_string)
            .then(function(body){
                var body_json = JSON.parse(body);
                this.ip_api_status = body_json["status"];
                this.country = body_json["country"];
                this.country_code = body_json["countryCode"];
                this.region = body_json["region"];
                this.region_name = body_json["regionName"];
                this.city = body_json["city"];
                this.zipcode = body_json["zip"];
                this.latitude = body_json["lat"];
                this.longitude = body_json["lon"];
                this.timezone = body_json["timezone"];
                this.isp = body_json["isp"];
                this.org_name = body_json["org"];
                this.as_name = body_json["as"];
                this.mobile = body_json["mobile"];
                this.proxy = body_json["proxy"];
                if(!this.ipAddress){
                    this.ipAddress = body_json["query"];
                }
                return true;
            })
            .catch(function(err) {
                console.log("Error handling ip api string: ", err);
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
