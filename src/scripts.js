const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
    const newLink = await prisma.link.create({
        data: {
            description: "GraphQL",
            url: "www.graphql.com"
        }
    })
    const allLinks = await prisma.link.findMany();
    console.log(allLinks);

}
main()
.catch((error) => {
    throw error
})
.finally(async() => {
    await prisma.$disconnect();
})