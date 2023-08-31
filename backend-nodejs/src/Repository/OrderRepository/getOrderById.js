const prisma = require('../../PrismaClient/prismaClient');

async function getOrderById(orderId) {
    return prisma.order.findFirst({
        where: {
            orderID: orderId
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

module.exports = getOrderById;

