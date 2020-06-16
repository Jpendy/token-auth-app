require('dotenv').config();

const User = require('./User');

describe('The User Model', () => {
    
  it('it sets a password hash', () => {
        
    const user = new User({
      email: 'jake@jake.com',
      password: 'jakePassword',
      profileImage: 'placeholder image url'
    });
    expect(user.passwordHash).toEqual(expect.any(String));

  });
});
