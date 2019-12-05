import express from 'express';
import IncidentController from '../controllers/IncidentController';
import Validations from '../middleware/Validations';
import HeaderToken from '../middleware/HeaderToken';

const router = express.Router();

router.post('/', Validations.validateFiles(), Validations.validateIncident, HeaderToken.isUser, IncidentController.createIncident);
router.get('/', HeaderToken.isUser, IncidentController.viewRedFlags);
router.get('/:redFlagId', HeaderToken.isUser, IncidentController.viewOneRedFlag);
router.patch('/:redFlagId/location', Validations.validateLocation, HeaderToken.isUser, IncidentController.updateRedFlagLocation);

export default router;
