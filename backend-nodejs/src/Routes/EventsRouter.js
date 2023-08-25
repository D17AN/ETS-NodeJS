const express = require('express');
const EventController = require('../Controllers/EventController');

const router = express.Router();

router.get('', EventController.getAllEvents);
router.get('/:eventId', EventController.getEventById);

module.exports = router;

