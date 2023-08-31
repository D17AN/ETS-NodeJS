const prisma =  require('../../PrismaClient/prismaClient');

async function getAllEvents() {
    return prisma.event.findMany({
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

module.exports = getAllEvents;

