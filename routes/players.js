import express from 'express';
import playersController from '../controllers/playersController.js';

const router = express.Router();

router.get('/search', playersController.searchPlayers);
router.get('/:player_id', playersController.getPlayer);
router.post('/', playersController.createPlayer);

export default router;
