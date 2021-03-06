var rpn = require('request-promise-native');


var LatestGithub = function () {
    var latest_github_response = {};

    //let github_string = ("https://api.github.com/users/alexbuechele/events");
    let options = {
        uri: 'https://api.github.com/users/alexbuechele/events',
        qs: {
            username: 'alexbuechele' // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'alexbuechele'
        },
        //json: true // Automatically parses the JSON string in the response
    };
    

                      
    return rpn(options)
        .then((body) => {
            let body_json = JSON.parse(body);
            latest_github_response.url = "https://github.com/" + body_json[0].repo.name + "/commits/" + body_json[0].payload.head;
            latest_github_response.datetime = body_json[0].created_at;
           
        })
        .catch(function(err) {
            console.log("Error finding last github commit: ", err);
        });

    //console.log(latest_github_response);
    //return latest_github_response;

}

module.exports = LatestGithub;
