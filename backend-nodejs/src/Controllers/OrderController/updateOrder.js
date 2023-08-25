const Prisma = require("@prisma/client").Prisma;
const orderService = require('../../Service/OrderService');
const OrderUpdateRequestBodyDTO = require('../../Models/RequestBodies/OrderUpdateRequestBodyDTO');

async function updateOrder(req, res){
    try {
        const userId = Number(req.params.userId);
        const orderId = Number(req.params.orderId);
        const ticketCategoryId = Number(req.body.ticketCategoryId);
        const numberOfTickets = Number(req.body.numberOfTickets);
        const orderUpdateRequestBody = new OrderUpdateRequestBodyDTO(ticketCategoryId, numberOfTickets);
        const order = await orderService.updateOrder(userId, orderId, orderUpdateRequestBody);
        return res.json(order);
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

module.exports = updateOrder;

