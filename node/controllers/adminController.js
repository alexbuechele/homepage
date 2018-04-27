exports.admin = function (req, res, next) {
    
    //check for login, render login page or admin panel
    res.render('admin', { title: "Admin login page" });
    next();
}
