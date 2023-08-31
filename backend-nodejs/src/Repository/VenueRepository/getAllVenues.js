const prisma = require('../../PrismaClient/prismaClient');

async function getAllVenues(){
    return prisma.venue.findMany({
        include: {
            Location: true
        }
    });
}

module.exports = getAllVenues;

