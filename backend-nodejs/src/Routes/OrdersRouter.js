const express = require('express');
const OrderController = require('../Controllers/OrderController');

const router = express.Router();

router.route('/:userId/orders')
    .get(OrderController.getAllOrdersOfUser)
    .post(OrderController.addOrder);

router.route('/:userId/orders/:orderId')
    .patch(OrderController.updateOrder)
    .delete(OrderController.deleteOrder);

module.exports = router;

