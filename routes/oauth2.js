const express = require('express');
const router = express.Router();
const rp = require('request-promise');

router.get('/', function(req, res, next) {
  if (!req.query.code) {
    const redirectUri = req.query.redirect_uri || 'http://localhost:3000/auth';
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectUri}`,
    );
  } else {
    const getAccessTokenReq = rp.post({
      json: true,
      url: 'https://github.com/login/oauth/access_token',
      headers: {
        'User-Agent': 'Nodejs-Express',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
      },
    });

    getAccessTokenReq
        .then(body => {
          req.session.accessToken = body.access_token;
          res.redirect('/');
        })
        .catch(e => console.log(e));
  }
});

module.exports = router;