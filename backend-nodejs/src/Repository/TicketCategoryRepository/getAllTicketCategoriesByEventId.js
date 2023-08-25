const prisma = require('../../PrismaClient/prismaClient');

async function getAllTicketCategoriesByEventId(eventId) {
    return prisma.ticketCategory.findMany({
        where: {
            eventID: eventId
        }
    });
}

module.exports = getAllTicketCategoriesByEventId;

