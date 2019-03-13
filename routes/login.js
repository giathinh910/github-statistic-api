const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  const data = {
    ...req.middlewareData,
    title: 'FE | Login'
  };
  res.render('login', data);
});

module.exports = router;