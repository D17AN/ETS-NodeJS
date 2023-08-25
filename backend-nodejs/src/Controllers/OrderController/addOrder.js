const Prisma = require("@prisma/client").Prisma;
const orderService = require('../../Service/OrderService');
const OrderAddRequestBodyDTO = require('../../Models/RequestBodies/OrderAddRequestBodyDTO');

async function addOrder(req, res){
    try{
        const userId = Number(req.params.userId);
        const ticketCategoryId = Number(req.body.ticketCategoryId);
        const eventId = Number(req.body.eventId);
        const numberOfTickets = Number(req.body.numberOfTickets);

        const orderAddRequestBody = new OrderAddRequestBodyDTO(ticketCategoryId, eventId, numberOfTickets);
        const order = await orderService.addOrder(userId, orderAddRequestBody);
        res.json(order);
    }
    catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const statusCode = error.code === 'P2002' ? 409 : 500;
            res.status(statusCode).json({ error: error.message });

        } else {
            res.status(400).json({ error: error.message });

        }
    }
}

module.exports = addOrder;
