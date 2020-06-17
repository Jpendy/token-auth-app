const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  name: {
    type: String,
    required: true
  },

  breedName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Dog', schema);
