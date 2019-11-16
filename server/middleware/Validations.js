import Joi from '@hapi/joi';

class Validations {
  static userSignup(req, res, next) {
    const schema = Joi.object().keys({
      fname: Joi.string().min(5).max(50).required(),
      lname: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(15).max(50).email()
        .required(),
      phone: Joi.string().min(5).max(20).required(),
      username: Joi.string().min(5).max(20).required(),
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
