exports.dummy = function (req, res, next) {
    res.render('dummy', { title: "Dummy page title", message: 'Welp' });
    next();
}

