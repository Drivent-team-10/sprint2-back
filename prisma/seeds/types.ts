import { prisma } from "./seed";

async function createTypes() {
  let type = await prisma.type.findMany();
  if (!type.length) {
      await prisma.type.createMany({
      data: [
        {
          name: 'Single',
          capacity: 1,
        },
        {
          name: 'Double',
          capacity: 2,
        }, 
        {
          name: 'Triple',
          capacity: 3,
        }
      ],
      skipDuplicates: true
    })
    type = await prisma.type.findMany();
  }

  return type;
}

export {
  createTypes,
};
