const prisma = require('../../PrismaClient/prismaClient');

async function getAllOrdersOfUser(userId) {
    return prisma.order.findMany({
        where: {
            userID: userId
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

module.exports = getAllOrdersOfUser;

