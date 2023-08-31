const Prisma = require("@prisma/client").Prisma;
const orderService = require('../../Service/OrderService');

async function getAllOrdersOfUser(req, res){
    try {
        const userId = Number(req.params.userId);
        const orders = await orderService.getAllOrdersOfUser(userId);
        return res.json(orders);
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const statusCode = error.code === 'P2002' ? 409 : 500;
            return res.status(statusCode).json({ error: error.message });
        } else {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = getAllOrdersOfUser;

