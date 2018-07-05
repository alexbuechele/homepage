exports.admin = function (req, res, next) {
    
    // TODO check for login, render login page or admin panel
    if (1 == 2){
        res.render('adminlogin');
    }
    else if (1 == 1){
        // let's bring up the last 10 visitors
        recentMessages= db.query("SELECT * FROM message_logs;", 
            (err, result) => {
                if (err){
                    console.log(err);
                }
                else {
                    for (x in result.rows){
                        console.log(result.rows[x].name);
                    }
                }
        });
        console.log(recentMessages);
        res.render('admin');
        //res.render('admin', {recentmessages: recentMessages});
    }
    next();
}
