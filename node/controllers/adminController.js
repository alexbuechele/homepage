message_logs_query = (cb) => {
    db.query("SELECT * FROM message_logs;", 
            (err, result) => {
                if (err){
                    console.log(err);
                }
                else {
                    cb(result.rows);
                }
        });
};

exports.admin = function (req, res) {
    
    function format_logs(message_rows) {

        res.render('admin', { messagerows: message_rows });
        
        //res.render('admin');
        //res.render('admin', {recentmessages: recentMessages});
    }


    // TODO check for login, render login page or admin panel
    if (1 == 2){
        res.render('adminlogin');
    }
    else if (1 == 1){
        message_logs_query(format_logs);

    }
}
