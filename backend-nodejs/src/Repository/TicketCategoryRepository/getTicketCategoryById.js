const prisma = require('../../PrismaClient/prismaClient');

async function getTicketCategoryById(ticketCategoryId) {
    return prisma.ticketCategory.findFirst({
        where: {
            ticketCategoryID: ticketCategoryId
        }
    });
}

module.exports = getTicketCategoryById;

