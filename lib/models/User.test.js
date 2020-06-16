require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../utils/connect');

const request = require('supertest');
const app = require('../app');

const User = require('./User');

describe('The User Model', () => {
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
    
  it('it sets a password hash', () => {
        
    const user = new User({
      email: 'jake@jake.com',
      password: 'jakePassword',
      profileImage: 'placeholder image url'
    });
    expect(user.passwordHash).toEqual(expect.any(String));
  });

  it('it has an authToken method on the user model', () => {
      
    const user = new User({
      email: 'jake@jake.com',
      password: 'jakePassword',
      profileImage: 'placeholder image url'
    });

    expect(user.authToken()).toEqual(expect.any(String));
  });

  it('it verifies the token and returns back the user', () => {
      
    const user = new User({
      email: 'jake@jake.com',
      password: 'jakePassword',
      profileImage: 'placeholder image url'
    });

    const token = user.authToken();
    const verifiedUser = User.verifyToken(token);

    expect(verifiedUser.toJSON()).toEqual(user.toJSON());
  });

  it('it signs up a new user', () => {
      
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ 
        email: 'jake@jake.com',
        password: 'jakePassword',
        profileImage: 'placeholder image url'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          email: 'jake@jake.com',
          profileImage: 'placeholder image url'
        });
      });
  });

  it('it logs in a user', () => {
      
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jake@jake.com',
        password: 'jakePassword',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          email: 'jake@jake.com',
          profileImage: 'placeholder image url'
        });
      });
  });

});
