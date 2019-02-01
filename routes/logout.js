const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  delete req.session.accessToken
  res.redirect('/login');
});

module.exports = router;