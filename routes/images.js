const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

router.get('/players/:player_id.jpg', imagesController.getPlayerImage);

module.exports = router;