const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const User = require('../models/User');

const cookieSetter = (user, res) => {
  res.cookie('session', user.authToken(), {
    maxAge: 1000 * 60 * 60 * 24 * 2,
    httpOnly: true
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        cookieSetter(user, res);
        res.send(user);
      })
      .catch(next);

  });
