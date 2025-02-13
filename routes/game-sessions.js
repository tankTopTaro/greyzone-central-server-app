const express = require('express');
const router = express.Router();
const gameSessionsController = require('../controllers/gameSessionsController');

router.post('/', gameSessionsController.uploadGameSessions)

module.exports = router;