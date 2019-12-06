import express from 'express';
import IncidentController from '../controllers/IncidentController';
import Validations from '../middleware/Validations';
import HeaderToken from '../middleware/HeaderToken';

const router = express.Router();

router.post('/', Validations.validateFiles(), Validations.validateIncident, HeaderToken.isUser, IncidentController.createIncident);
router.get('/', HeaderToken.isUser, IncidentController.viewRedFlags);
router.get('/:redFlagId', HeaderToken.isUser, IncidentController.viewaRedFlag);
router.patch('/:redFlagId/location', Validations.validateLocation, HeaderToken.isUser, IncidentController.updateRedFlagLocation);
router.patch('/:redFlagId/comment', Validations.validateComment, HeaderToken.isUser, IncidentController.updateRedFlagComment);
router.delete('/:redFlagId', HeaderToken.isUser, IncidentController.removeRedFlag);
router.patch('/:redFlagId/restart', HeaderToken.isUser, IncidentController.restartRedFlag);
router.patch('/:redFlagId/pending', HeaderToken.isUser, IncidentController.putInPending);

export default router;
