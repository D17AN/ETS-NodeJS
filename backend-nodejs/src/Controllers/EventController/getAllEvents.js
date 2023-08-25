const Prisma = require("@prisma/client").Prisma;
const eventService = require('../../Service/EventService');

async function getAllEvents(req, res){
    try  {
        const searchKey = (req.query.searchKey)?.toLowerCase();
        const venuesIdList = (req.query.venuesIdList)?.map((venueId) => {
            return Number(venueId);
        });
        const eventTypesList = (req.query.eventTypesList)?.map((eventType) => {
            return eventType.toLowerCase();
        });
        const page = Number(req.query.page ?? 1);
        const pageSize = Number(req.query.pageSize ?? 10);

        const eventDTOWrapper = await eventService.getAllEventsPaginated(searchKey,
            venuesIdList, eventTypesList, page, pageSize);

        return res.json(eventDTOWrapper);
    }
    catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const statusCode = error.code === 'P2002' ? 409 : 500;
            return res.status(statusCode).json({ error: error.message });
        } else {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = getAllEvents;

