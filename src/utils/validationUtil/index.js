const Joi = require('joi');

const bodySchema = Joi.object({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
});

const headerSchema = Joi.object({
  headers: {
    authorization: {
      token: Joi.string().required()
    }
  }
});

module.exports = { bodySchema, headerSchema };