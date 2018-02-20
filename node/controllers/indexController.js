//require models
var MessageLog = require('../models/messageLog');

//validation?
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res){
    //call geo-logger here?

    res.render('index', {
        // data we send to render
        // catch errors?
    });
};

exports.contact_me = [
    //array of functions to call

    //validate fields with 'body',
    body('name', 'Name must not be empty.').isLength({ min: 1}).trim(),
    body('email', 'Email must not be empty.').isLength({ min: 1}).trim(),
    body('message', 'You forgot your message!').isLength({ min: 1}).trim(),
    
    //sanitize fields with 'sanitizeBody,
    sanitizeBody('*').trim().escape(),

    //process request
    (req, res, next) => {
        //const errors = validationResult(req);
        const errors = validationResult(req);

        var messageLog = new MessageLog({
            name: req.body.name,
            email: req.body.email,
            message: req.body.email,
            ipaddress: req.headers["x-real-ip"]
        });
        
        if (!errors.isEmpty()){
            //handle errors by re-rendering form?
            //for now let's just go home, user doesn't realize message failed
            res.render('index');
            return;
        }

        else {
            //save the message to postgres
            //where is .save coming from? and err?
            messageLog.save(function (err){
                if (err) { 
                    return next(err); 
                }
                //add feedback indicating message was a success?
                res.render('index');
            });
        }
    }
];