const prisma = require( '../../PrismaClient/prismaClient');

async function getAllEventsPaginated(searchKey, venuesIdList, eventTypesList, page, pageSize) {
    
    const queryConditions = {
        where: {},
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            Venue: {
                include: {
                    Location: true
                }
            },
            EventType: true,
            TicketCategory: true
        }
    };

    if (searchKey && searchKey.trim() !== "") {
        queryConditions.where.eventName = {
            contains: searchKey.trim().toLowerCase(),
        };
    }

    if (venuesIdList && venuesIdList.length > 0) {
        queryConditions.where.venueID = {
            in: venuesIdList,
        };
    }

    if (eventTypesList && eventTypesList.length > 0) {
        queryConditions.where.EventType = {
            eventTypeName: {
                in: eventTypesList,
            },
        };
    }

    return prisma.event.findMany(queryConditions);
}

module.exports = getAllEventsPaginated;

