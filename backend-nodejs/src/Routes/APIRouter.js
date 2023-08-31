const express = require('express');
const eventsRouter = require('./EventsRouter');
const eventTypesRouter = require('./EventTypesRouter');
const venuesRouter = require('./VenuesRouter');
const ordersRouter = require('./OrdersRouter');

const apiRouter = express.Router();

apiRouter.use('/events', eventsRouter);
apiRouter.use('/eventTypes', eventTypesRouter);
apiRouter.use('/venues', venuesRouter);
apiRouter.use('', ordersRouter);

module.exports = apiRouter;

