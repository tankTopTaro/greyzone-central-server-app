const express = require('express');
const router = express.Router();
const facilitySessionController = require('../controllers/facilitySessionController');

router.post('/create', facilitySessionController.createFacilitySession)

module.exports = router;