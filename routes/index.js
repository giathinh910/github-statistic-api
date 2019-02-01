const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  const data = {
    title: 'FE weekly report',
    message: '',
    isAuth: !!req.session.accessToken
  }
  res.render('index', data);
});

module.exports = router;