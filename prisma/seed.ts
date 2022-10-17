import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let index = 0; index < 5; index++) {
    await prisma.post.create({
      data: {
        title: "cama de madera" + index,
        content: "acolchado cuero",
        height: 234,
        length_: 123,
        width: 123,
        authorId: "cl98rywqa0000vhycvb132vgj",
      },
    });
  }
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
