const prisma = require('../../PrismaClient/prismaClient');

async function getEventById(eventId){
    return prisma.event.findFirst({
        where: {
            eventID: eventId,
        },
        include: {
            Venue: {
                include: {
                    Location: true
                }
            },
            EventType: true,
            TicketCategory: true
        }
    });
}

module.exports = getEventById;

