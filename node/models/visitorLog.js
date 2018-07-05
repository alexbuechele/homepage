db = require('../db');
var rpn = require('request-promise-native');



var VisitorLog = function (ipAddress) {
    var log_object = {};
    log_object.ipAddress = ipAddress;

    var ip_api_string = ("http://ip-api.com/json/" + 
                        (log_object.ipAddress ? log_object.ipAddress : '') + 
                        "?fields=258047");
        
                      
    rpn(ip_api_string)
        .then((body) => {
            var body_json = JSON.parse(body);
            log_object.ip_api_status = body_json["status"];
            log_object.country = body_json["country"];
            log_object.country_code = body_json["countryCode"];
            log_object.region = body_json["region"];
            log_object.region_name = body_json["regionName"];
            log_object.city = body_json["city"];
            log_object.zipcode = body_json["zip"];
            log_object.latitude = body_json["lat"];
            log_object.longitude = body_json["lon"];
            log_object.timezone = body_json["timezone"];
            log_object.isp = body_json["isp"];
            log_object.org_name = body_json["org"];
            log_object.as_name = body_json["as"];
            log_object.mobile = body_json["mobile"];
            log_object.proxy = body_json["proxy"];
            if(!log_object.ipAddress){
                log_object.ipAddress = body_json["query"];
            }

            db.query("INSERT INTO visitor_logs (ipaddress, ip_api_status, " +
                "country, country_code, region, region_name, city, zipcode, " +
                "latitude, longitude, timezone, isp, org_name, as_name, mobile, proxy) "
                + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);",
                [log_object.ipAddress, log_object.ip_api_status, log_object.country, log_object.country_code, log_object.region, 
                log_object.region_name, log_object.city, log_object.zipcode, log_object.latitude, log_object.longitude, 
                log_object.timezone, log_object.isp, log_object.org_name, log_object.as_name, log_object.mobile, log_object.proxy],
            
            // fix log_object error handling
                (err, result) => {
                    if (err){
                        console.log(err);
                    }
                    
                });
           
        })
        .catch(function(err) {
            console.log("Error handling ip api string: ", err);
        });

    return log_object;
        

}

module.exports = VisitorLog;
