const Prisma = require("@prisma/client").Prisma;
const venueRepository = require('../../Service/VenueService');

async function getAllVenues(req, res){
    try {
        const venues = await venueRepository.getAllVenues();
        return res.json(venues);
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

module.exports = getAllVenues;

