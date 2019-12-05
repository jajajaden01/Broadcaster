import Joi from '@hapi/joi';
import multer from 'multer';

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
      res.status(401).json({
        status: res.statusCode,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }

    next();
  }

  static userSignin(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(50).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(401).json({
        status: res.statusCode,
        error: 'invalid credentials',
      });
    } else next();
  }

  static validateIncident(req, res, next) {
    const schema = Joi.object().keys({
      title: Joi.string().min(10).required(),
      type: Joi.string().min(5).required(),
      comment: Joi.string().min(15).required(),
      lat: Joi.number().required(),
      long: Joi.number().required(),
      status: Joi.string().valid('draft', 'pending').required(),
    });

    try {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).json({
          status: res.statusCode,
          error: error.details[0].message.replace(/"/g, ''),
        });
      } else next();
    } catch (err) {
      res.status(400).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static validateFiles() {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        if (file.fieldname === 'images') {
          cb(null, './server/uploads/images/');
        }

        if (file.fieldname === 'videos') {
          cb(null, './server/uploads/videos/');
        }
      },
      filename(req, file, cb) {
        cb(null, `${file.fieldname}-${new Date().toISOString()}-${file.originalname}`);
      },
    });

    const fileFilter = (re, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
      } else if (file.mimetype === 'video/mp4') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    multer({ dest: './server/uploads/images/' });
    multer({ dest: './server/uploads/videos/' });

    const upload = multer({
      storage,
      fileFilter,
    });
    return upload.fields([{ name: 'images', maxCount: 4 }, { name: 'videos', maxCount: 2 }]);
  }

  static validateLocation(req, res, next) {
    const schema = Joi.object().keys({
      lat: Joi.number().required(),
      long: Joi.number().required(),
    });

    try {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).json({
          status: res.statusCode,
          error: error.details[0].message.replace(/"/g, ''),
        });
      } else next();
    } catch (err) {
      res.status(400).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static validateComment(req, res, next) {
    const schema = Joi.object().keys({
      comment: Joi.string().min(15).required(),
    });

    try {
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400).json({
          status: res.statusCode,
          error: error.details[0].message.replace(/"/g, ''),
        });
      } else next();
    } catch (err) {
      res.status(400).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }
}

export default Validations;
