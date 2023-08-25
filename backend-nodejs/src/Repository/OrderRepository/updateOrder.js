const prisma = require('../../PrismaClient/prismaClient');

async function updateOrder(newOrder) {
    return prisma.order.update({
        where: {
            orderID: newOrder.orderID
        },
        data: {
            TicketCategory: {
                connect: {
                    ticketCategoryID: newOrder.ticketCategoryID,
                },
            },
            numberOfTickets: newOrder.numberOfTickets,
            totalPrice: newOrder.totalPrice
        },
        include: {
            TicketCategory: {
                select: {
                    eventID: true,
                    price: true
                }
            }
        }
    });
}

module.exports = updateOrder;

