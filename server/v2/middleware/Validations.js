import Joi from '@hapi/joi';

class Validations {
  static userSignup(req, res, next) {
    const schema = Joi.object().keys({
      fname: Joi.string().max(50).required(),
      lname: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      username: Joi.string().max(20).required(),
      password: Joi.string().min(5).max(50).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: res.statusCode,
        error: 'invalid credentials',
      });
    } else next();
  }
}

export default Validations;
