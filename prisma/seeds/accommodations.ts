import { prisma } from './seed';

async function createAccommodations() {
  let accommodations = await prisma.accommodation.findMany();
  if (!accommodations.length) {
    await prisma.accommodation.createMany({
      data: [
        {
          name: 'Driven Resort',
          capacity: 125,
        },
        {
          name: 'Driven Palace',
          capacity: 125,
        }, 
        {
          name: 'Driven World',
          capacity: 125,
        }
      ],
      skipDuplicates: true
    })
    accommodations = await prisma.accommodation.findMany();
  }

  console.log(accommodations);
  

  return accommodations;
}

export {
  createAccommodations,
};
