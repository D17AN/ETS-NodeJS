const express = require('express');
const EventTypesController = require('../Controllers/EventTypesController');

const router = express.Router();

router.get('', EventTypesController.getAllEventTypes);

module.exports = router;

