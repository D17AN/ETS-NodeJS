const prisma = require('../../PrismaClient/prismaClient');

async function getAllUsers() {
    return prisma.user.findMany();
}

module.exports = getAllUsers;

