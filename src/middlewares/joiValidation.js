const joiValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req);
    if( error ) {
      res.status(400).json({ error: error.message });
      return;
    }
    next();
  };
};
  
module.exports = joiValidation;