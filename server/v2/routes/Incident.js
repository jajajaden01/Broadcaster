import express from 'express';
import IncidentController from '../controllers/IncidentController';
import Validations from '../middleware/Validations';
import HeaderToken from '../middleware/HeaderToken';

const router = express.Router();

router.post('/', Validations.validateFiles(), Validations.validateIncident, HeaderToken.isUser, IncidentController.createIncident);

export default router;
