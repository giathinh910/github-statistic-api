const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const data = {
    ...req.middlewareData,
    title: 'FE | Home',
  };

  res.redirect('/member-statistic');
});

module.exports = router;
