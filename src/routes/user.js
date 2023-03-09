const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const {validationUtil} = require('../utils');
const {joiValidation} = require('../middlewares/joiValidation');

router.route('/register')
  .post(userController.createUser);

router.route('/login')
  .post(userController.loginUser);

router.route('/logout')
  .get(userController.logoutUser);
 
router.route('/validate')
  .get(userController.validateUser);


module.exports = router;