//require models
var MessageLog = require('../models/messageLog');
var visitorLog = require('../models/visitorLog');
var latestGithub = require('../models/latestGithub');

//validation?
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res, next){
    //call geo-logger here?
    visitorLog(req.headers["x-real-ip"]);
    
    // let's just do static for now
    /*
    res.render('index', {
        // data we send to render
        // catch errors?
    });
    */
   var latest_github_data = {url: 'https://github.com/alexbuechele',
                            created_at: '234'};
   latestGithub().then(latest_github_response => {
       console.log("WHERE");
       console.log(latest_github_response);
   });
   console.log(latest_github_data);
   let latest_g = latest_github_data.url;
   let latest_g_d = latest_github_data.created_at;

   res.render('index', { latest_github: latest_g, latest_github_date: latest_g_d });
   next();

};

exports.contact_me = [
    //array of functions to call

    
    //validate fields with 'body',
    body('name', 'Name must be 1-45 characters').isLength({ min: 1, max: 45}).trim(),
    body('email', 'Email must be 1-45 characters').isLength({ min: 1, max: 45}).trim(),
    body('message', 'You forgot your message!').isLength({ min: 1}).trim(),

    //sanitize fields with 'sanitizeBody,
    sanitizeBody('*').trim().escape(),
    

    //---process request
    (req, res, next) => {

        const errors = validationResult(req);
        
        //---we are using a model for this. necessary?
        //---maybe to access these logs we would want them back as models
        
        var messageLog = new MessageLog(req.body.name,
                                        req.body.email,
                                        req.body.message,
                                        req.headers["x-real-ip"]);
        
        // FIX THIS
        //if (!errors.isEmpty()){
        if (1 == 2){
            //---handle errors by re-rendering form?
            //---for now let's just go home, user doesn't realize message failed
            res.render('index');
            return;
        }

        else {
            //---save the message to postgres
            messageLog.save();
        }

        res.redirect("/");
        
    }
];