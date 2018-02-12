const users = require('./user');

module.exports = (app) => {
    app.user('/users', users);
};

