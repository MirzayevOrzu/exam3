const { PrismaClient } = require("@prisma/client");
const { hashSync } = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { username: "shakhboz" },
    update: {},
    create: {
      username: "shakhboz",
      password: hashSync("123qwe", 10),
      role: "superadmin",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
