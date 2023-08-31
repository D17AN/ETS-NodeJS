const getAllOrdersOfUser = require('./getAllOrdersOfUser');
const getNumberOfAvailableTicketsByEventId = require('./getNumberOfAvailableTicketsByEventId');
const addOrder = require('./addOrder');
const updateOrder = require('./updateOrder');
const deleteOrder = require('./deleteOrder');

module.exports = {
    getAllOrdersOfUser,
    getNumberOfAvailableTicketsByEventId,
    addOrder,
    updateOrder,
    deleteOrder
}

