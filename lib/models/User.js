const mongoose = require('mongoose');
CONST bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  profileImage: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});


schema.virtual('password').set(function(password) {

  this.passwordHash = bcrypt.hashsync(password, +process.env.SALT_ROUNDS || 8);
});

module.exports = mongoose.model('User', schema);
