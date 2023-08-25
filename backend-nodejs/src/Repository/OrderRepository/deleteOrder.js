const prisma = require('../../PrismaClient/prismaClient');

async function deleteOrder(order) {
    return prisma.order.delete({
        where: {
            orderID: order.orderID
        },
        include: {
            TicketCategory: {
                select: {
                    eventID: true,
                    price: true
                }
            }
        }
    });
}

module.exports = deleteOrder;

