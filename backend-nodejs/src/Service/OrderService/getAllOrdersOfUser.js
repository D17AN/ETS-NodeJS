const mapper = require('../../Mappers');
const orderRepository = require('../../Repository/OrderRepository');
const userRepository = require('../../Repository/UserRepository');

async function getAllOrdersOfUser(userId){
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new Error('User not found!');
    }

    const orders = await orderRepository.getAllOrdersOfUser(userId);

    return orders.map((order) => {
        return mapper.mapToOrderDTO(order);
    });
}

module.exports = getAllOrdersOfUser;

