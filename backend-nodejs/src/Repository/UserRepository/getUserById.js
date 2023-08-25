const prisma = require('../../PrismaClient/prismaClient');

async function getUserById(userId) {
    return prisma.user.findFirst({
        where: {
            userID: userId
        }
    });
}

module.exports = getUserById;

