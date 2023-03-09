const {userService} = require('../services');
const {CustomError} = require('../utils');


const createUser = async(req,res) => {
  try {
      
    const newUser = await userService.createUser({...req.body});
    res.status(201).json({
      data: newUser
    });

  }
  catch(error) {
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error:error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

const loginUser = async (req,res) =>{
  try {
    const token = await userService.loginUser({...req.body});
    console.log(token);
    res.status(200).json({
      data: token
    });
    return;
  } catch(error){
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error:error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

const logoutUser = async (req, res)=>{
  try {
    const token =  req.headers.authorization.split(' ')[1];
    const logout = await userService.logoutUser(token);
    res.status(200).json({
      data: logout
    });
  }
  catch (error) {
    console.log(error);
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error:error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  
  }
};

const validateUser = async(req,res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const userData = await userService.validateUser(token);
    res.status(200).json({
      data: userData
    });
  }
  catch(error){
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error:error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};
module.exports = { createUser, loginUser, validateUser, logoutUser };