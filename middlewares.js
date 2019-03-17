const isAuthenticated = (req, res, next) => {
  req.middlewareData = {};
  // authenticated indicator
  req.middlewareData.isAuth = !!req.session.accessToken;
  if (!req.session.accessToken) {
    res.redirect('/login');
    return;
  }
  next();
};

const isNotAuthenticated = (req, res, next) => {
  req.middlewareData = {};
  req.middlewareData.isAuth = !!req.session.accessToken;
  if (req.session.accessToken) {
    res.redirect('/');
    return;
  }
  next();
};

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
};