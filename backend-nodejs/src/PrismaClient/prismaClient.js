const PrismaClient = require('@prisma/client').PrismaClient;

let prismaInstance;

if (!prismaInstance){
    prismaInstance = new PrismaClient();
}

process.on('beforeExit', () => {
    prismaInstance.$disconnect();
});

module.exports = prismaInstance;

