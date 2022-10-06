import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.create({
    data: {
      title: "respaldo",
      content: "respaldo de cuero",
      height: 234,
      length_: 123,
      width: 123,
      authorId: "cl8ngs7rv000055ig391rnsu8",
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
