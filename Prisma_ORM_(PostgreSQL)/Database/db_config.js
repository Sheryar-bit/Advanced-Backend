const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log:["query"]
});

//Now I can start sending queries via the generated Prisma Client API

module.exports =  prisma ;