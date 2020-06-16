require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const User = require('../lib/models/User');

const request = require('supertest');
const app = require('../lib/app');
const Dog = require('../lib/models/Dog');

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
  let dog;
  beforeEach(async() => {
    user = await User.create({
      email: 'jake@jake.com',
      password: 'jakePassword',
      profileImage: 'placeholder image url'
    });

    dog = await Dog.create({
      user: user._id,
      name: 'Leo',
      breedName: 'Black Lab'
    });
  });

  it('it creates a new dog but only if user is signed in and logged in', () => {
    
    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'jake@jake.com',
        password: 'jakePassword',
      })
      .then(() => {
        return agent
          .post('/api/v1/dogs')
          .send({
            user: user._id,
            name: 'Leo',
            breedName: 'Black Lab'
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.anything(),
              user: user.id,
              name: 'Leo',
              breedName: 'Black Lab',
              __v: 0
            });
          });
      });
  });

  it('it gets a list of all dogs if user is logged in', () => {
    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'jake@jake.com',
        password: 'jakePassword',
      })
      .then(() => {
        return agent
          .get('/api/v1/dogs')
          .then(res => {
            expect(res.body).toEqual(
              [{
                __v: 0,
                _id: dog.id,
                breedName: 'Black Lab',
                name: 'Leo',
                user: user.id 
              }]
            );
          });
      });
  });



  it('it gets a dog by id with GET', () => {
    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'jake@jake.com',
        password: 'jakePassword',
      })
      .then(() => {
        return agent
          .get(`/api/v1/dogs/${dog._id}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.anything(),
              user: user.id,
              name: 'Leo',
              breedName: 'Black Lab',
              __v: 0
            });
          });
      });
  });

  it('it updates a dog if user is logged in', () => {
    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'jake@jake.com',
        password: 'jakePassword',
      })
      .then(() => {
        return agent
          .patch(`/api/v1/dogs/${dog._id}`)
          .send({ name: 'Ozlo' })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.anything(),
              user: user.id,
              name: 'Ozlo',
              breedName: 'Black Lab',
              __v: 0
            });
          });
      });
  });

  it('it deletes a dog if user is logged in', () => {    
    const agent = request.agent(app);

    return agent
      .post('/api/v1/auth/login')
      .send({
        email: 'jake@jake.com',
        password: 'jakePassword',
      })
      .then(() => {
        return agent
          .delete(`/api/v1/dogs/${dog._id}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.anything(),
              user: user.id,
              name: 'Leo',
              breedName: 'Black Lab',
              __v: 0
            });
          });
      });
  });
});
