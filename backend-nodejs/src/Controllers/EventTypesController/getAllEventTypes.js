const Prisma = require("@prisma/client").Prisma;
const eventTypeService = require('../../Service/EventTypeService');

async function getAllEventTypes(req, res){
    try {
        const eventTypes = await eventTypeService.getAllEventTypes();
        return res.json(eventTypes);
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

module.exports = getAllEventTypes;

