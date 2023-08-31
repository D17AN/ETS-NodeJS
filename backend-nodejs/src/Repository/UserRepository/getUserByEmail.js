const prisma = require('../../PrismaClient/prismaClient');

async function getUserByEmail(userEmail) {
    return prisma.user.findFirst({
        where: {
            userEmail: userEmail
        }
    });
}

module.exports = getUserByEmail;

