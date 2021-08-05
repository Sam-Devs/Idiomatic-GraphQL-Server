const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
    const allLinks = prisma.link.findMany();
    console.log(allLinks);
}
main()
.catch((error) => {
    throw error
})
.finally(async() => {
    await prisma.$disconnect();
})