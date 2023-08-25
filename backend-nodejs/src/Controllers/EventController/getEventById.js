const Prisma = require("@prisma/client").Prisma;
const eventService = require('../../Service/EventService');

async function getEventById(req, res){
    try {
        const eventId = Number(req.params.eventId);
        const eventDTO = await eventService.getEventById(eventId);
        return res.json(eventDTO);
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

module.exports = getEventById;

