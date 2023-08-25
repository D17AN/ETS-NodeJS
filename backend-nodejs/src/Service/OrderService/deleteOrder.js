const mapper = require('../../Mappers');
const orderRepository = require('../../Repository/OrderRepository');
const userRepository = require('../../Repository/UserRepository');

async function deleteOrder(userId, orderId){
    const user = await userRepository.getUserById(userId);
    const order = await orderRepository.getOrderById(orderId);

    if (!user) {
        throw new Error(`User with '${userId}' not found.`);
    }

    if (!order) {
        throw new Error(`Order with '${orderId}' not found.`);
    }

    const removedOrder = await orderRepository.deleteOrder(order);
    return mapper.mapToOrderDTO(removedOrder);
}

module.exports = deleteOrder;

