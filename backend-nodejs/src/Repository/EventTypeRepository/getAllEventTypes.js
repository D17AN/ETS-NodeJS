const prisma = require('../../PrismaClient/prismaClient');

async function getAllEventTypes(){
    return prisma.eventType.findMany();
}

module.exports = getAllEventTypes;

