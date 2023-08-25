const express = require('express');
const VenueController = require('../Controllers/VenueController');

const router = express.Router();

router.get('', VenueController.getAllVenues);

module.exports = router;

