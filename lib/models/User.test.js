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
});
