const { userService } = require('../../src/services');
const { passwordUtil, redisUtil} = require('../../src/utils');
const jwt = require('jsonwebtoken');

const { User } = require('../../database/models');

describe('User Service', () => { 
  const mockData = {
    username: 'test',
    password: 'test',
  };

  it('should create a new user', async () => {
    jest.spyOn(User, 'create').mockResolvedValue(mockData);
    jest.spyOn(passwordUtil, 'hashPassword').mockResolvedValue('hashPassword');
    const result = await userService.createUser(mockData);
    expect(result).toEqual({ username: 'test' });
  });

  it('should login a user', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(true);
    jest.spyOn(passwordUtil, 'comparePassword').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockResolvedValue('token');
    jest.spyOn(redisUtil, 'set').mockResolvedValue();

    const result = await userService.loginUser(mockData);
    expect(result).toEqual({ token: 'Bearer token' });
  });

  it('should logout a user', async () => {
    jest.spyOn(redisUtil, 'remove').mockResolvedValue();
    const result = await userService.logoutUser();
    expect(result).toEqual({ message: 'Logged out successfully' });
  });

  it('should validate user', async () => {
    jest.spyOn(redisUtil, 'get').mockResolvedValue(true);
    jest.spyOn(jwt, 'verify').mockResolvedValue('token');
    const result = await userService.validateUser();
    expect(result).toEqual('token');
  });
});
