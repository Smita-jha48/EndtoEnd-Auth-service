const router = require('express').Router();

const userRoute = require('./user');

router.use('/auth', userRoute);

module.exports = router;