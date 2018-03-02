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
    body('name', 'Name must be 1-45 characters').isLength({ min: 1, max: 45}).trim(),
    body('email', 'Email must be 1-45 characters').isLength({ min: 1, max: 45}).trim(),
    body('message', 'You forgot your message!').isLength({ min: 1}).trim(),
    
    //sanitize fields with 'sanitizeBody,
    sanitizeBody('*').trim().escape(),

    //---process request
    (req, res, next) => {
        //do i understand how this works?
        const errors = validationResult(req);

        //---we are using a model for this. necessary?
        //---maybe to access these logs we would want them back as models
        
        var messageLog = new MessageLog(req.body.name,
                                        req.body.email,
                                        req.body.message,
                                        req.headers["x-real-ip"]);
        
        if (!errors.isEmpty()){
            //---handle errors by re-rendering form?
            //---for now let's just go home, user doesn't realize message failed
            res.render('index');
            return;
        }

        else {
            //---save the message to postgres
            //---where is .save coming from? and err?
            messageLog.save(function (err){
                if (err) { 
                    res.render('error');
                    //---pass err?

                    //return next(err); 
                    //--- more middleware after this? or is this the last stop
                }
                //---add feedback indicating message was a success?
                res.render('index');
            });
        }
    }
];