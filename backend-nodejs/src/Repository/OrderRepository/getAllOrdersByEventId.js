const prisma = require('../../PrismaClient/prismaClient');

async function getAllOrdersByEventId(eventId) {
    return prisma.order.findMany({
        where: {
            TicketCategory: {
                Event: {
                    eventID: eventId
                },
            },
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

module.exports = getAllOrdersByEventId;

