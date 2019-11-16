import express from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middleware/Validations';

const router = express.Router();
router.post('/signup', Validations.userSignup, UserController.signup);

export default router;
