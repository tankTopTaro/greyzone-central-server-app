import express from 'express';
import gameSessionsController from '../controllers/gameSessionsController.js';

const router = express.Router();

router.post('/', gameSessionsController.uploadGameSessions);

export default router;
