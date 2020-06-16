const { Router } = require('express');
const Dog = require('../models/Dog');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Dog
      .create({ ...req.body, user: req.body._id })
      .then(dog => res.send(dog))
      .catch(next);
  });


