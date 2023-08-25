const Prisma = require("@prisma/client").Prisma;
const eventTypeService = require('../../Service/EventTypeService');

async function getAllEventTypes(req, res){
    try{
        const eventTypes = await eventTypeService.getAllEventTypes();
        res.json(eventTypes);
    }
    catch(error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const statusCode = error.code === 'P2002' ? 409 : 500;
            res.status(statusCode).json({ error: error.message });

        } else {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = getAllEventTypes;
