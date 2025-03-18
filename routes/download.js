import express from 'express';
import downloadController from '../controllers/downloadController.js';

const router = express.Router();

router.get('/:facility_id', downloadController.downloadDB);

export default router;
