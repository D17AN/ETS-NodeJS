const prisma = require('../../PrismaClient/prismaClient');

async function getAllEventsCount(searchKey, venuesIdList, eventTypesList) {
    const queryConditions = {
        where: {},
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

    return prisma.event.count({
        where: queryConditions.where,
    });
}

module.exports = getAllEventsCount;

