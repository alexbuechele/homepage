var rpn = require('request-promise-native');


var LatestGithub = function () {
    var latest_github_response = {};

    let github_string = ("https://api.github.com/users/alexbuechele/events");
        
                      
    rpn(github_string)
        .then((body) => {
            var body_json = JSON.parse(body);
            latest_github_response.url = "https://github.com/" + body_json[0].repo.name + "/commits/" + body_json[0].payload.head;
            latest_github_response.datetime = body_json[0].created_at;
           
        })
        .catch(function(err) {
            console.log("Error finding last github commit: ", err);
        });

    return latest_github_response;
        

}

module.exports = VisitorLog;
