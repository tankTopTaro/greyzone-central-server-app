import express from 'express';
import facilitySessionController from '../controllers/facilitySessionController.js';

const router = express.Router();

router.post('/create', facilitySessionController.createFacilitySession);

export default router;
