const Prisma = require("@prisma/client").Prisma;
const orderService = require('../../Service/OrderService');

async function updateOrder(req, res){
    try{
        const userId = Number(req.params.userId);
        const orderId = Number(req.params.orderId);

        const order = await orderService.deleteOrder(userId, orderId);
        res.json(order);
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

module.exports = updateOrder;
