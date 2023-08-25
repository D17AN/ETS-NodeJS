const prisma = require('../../PrismaClient/prismaClient');

async function getAllTicketCategories(){
    return prisma.ticketCategory.findMany();
}

module.exports = getAllTicketCategories;

