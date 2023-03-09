const {CustomError, passwordUtil, redisUtil} = require('../utils');
const {User} = require('../../database/models');
const jwt = require('jsonwebtoken');

const createUser = async({email, password}) => {
  const hashPassword = await passwordUtil.hashPassword(password);
  const newUser = await User.create({
    email,
    password: hashPassword
  });
  return { email: newUser.email};
};

const loginUser = async({email, password}) => {
  console.log(email, password);
  const user = await User.findOne({where: {email:email}});
  if(!user) {
    throw new CustomError(401, 'User Not Found');
  }
  const checkPassword = await passwordUtil.comparePassword(password, user.password);
  if(!checkPassword){
    throw new CustomError(401, 'Wrong Password');
  }
  const token = await jwt.sign({id: user.id, email: user.email},process.env.JWT_SECRET);
  await redisUtil.set(token);
  return {token: `Bearer ${token}`};
};

const logoutUser = async(token) => {
  await redisUtil.remove(token);
  return { message: 'Logged out successfully'};
};

const validateUser = async(token) =>{
  const userData = await jwt.verify(token, process.env.JWT_SECRET);
  if(!userData) {
    throw new CustomError(400, 'Unauthorized User(token error)');
  }   const redisToken = await redisUtil.get(token);
  if(!redisToken) {
    throw new CustomError(400, 'Unauthorized User(token invalid)');
  }
  return userData;
};

module.exports = {createUser,loginUser,validateUser,logoutUser};