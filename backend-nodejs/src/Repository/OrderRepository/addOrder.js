const prisma = require('../../PrismaClient/prismaClient');

async function addOrder(order) {
    return prisma.order.create({
        data: order,
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

module.exports = addOrder;

