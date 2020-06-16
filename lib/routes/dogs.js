const { Router } = require('express');
const Dog = require('../models/Dog');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Dog
      .create({ ...req.body, user: req.user._id })
      .then(dog => res.send(dog))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Dog
      .find()
      .then(dogs => res.send(dogs))
      .catch(next);
  })

  .get('/:id', ensureAuth, (req, res, next) => {
    Dog
      .findById(req.params.id)
      .then(dogs => res.send(dogs))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Dog
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(dog => res.send(dog))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Dog
      .findByIdAndDelete(req.params.id)
      .then(dog => res.send(dog))
      .catch(next);
  });




