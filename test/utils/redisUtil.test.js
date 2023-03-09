const { redisUtil } = require('../../src/utils');

// jest.mock('')
describe('Redis Utils', () => { 
  it('should set token to redis', async () => {
    jest.spyOn(redisUtil.redisClient, 'set').mockResolvedValue();
    
    await redisUtil.set('token');
    expect(redisUtil.redisClient.set).toHaveBeenCalled();
  });

  it('should get token from redis', async () => {
    jest.spyOn(redisUtil.redisClient, 'get').mockResolvedValue('token');
    
    const token = await redisUtil.get();
    expect(token).toEqual('token');
  });

  it('should delete token from redis', async () => {
    jest.spyOn(redisUtil.redisClient, 'del').mockResolvedValue();
    
    await redisUtil.remove('token');
    expect(redisUtil.redisClient.del).toHaveBeenCalled();
  });
});