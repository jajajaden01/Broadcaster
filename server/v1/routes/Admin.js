import express from 'express';
import AdminController from '../controllers/AdminController';
import IncidentController from '../controllers/IncidentController';
import Validations from '../middleware/Validations';
import HeaderToken from '../middleware/HeaderToken';

const router = express.Router();
router.post('/signin', Validations.userSignin, AdminController.signin);
router.patch('/:redFlagId/status', Validations.validateStatus, HeaderToken.isAdmin, IncidentController.changeStatus);

export default router;
