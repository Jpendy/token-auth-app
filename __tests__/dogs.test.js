const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const User = require('../lib/models/User');

const request = require('supertest');
const app = require('../lib/app');

describe('token-auth-app routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  let user;

  beforeEach(async() => {
    user = await User.create({
      email: 'jake@jake.com',
      password: 'jakePassword',
      profileImage: 'placeholder image url'
    });
  });

  it('it creates a new dog but only if user is signed in and verified', () => {
      
  });

});
