const isAuthenticated = (req, res, next) => {
    if (!req.session.accessToken) {
        res.redirect('/login');
        return;
    }
    next();
};

const isNotAuthenticated = (req, res, next) => {
    if (req.session.accessToken) {
        res.redirect('/');
        return;
    }
    next();
};

module.exports = {
    isAuthenticated,
    isNotAuthenticated
};