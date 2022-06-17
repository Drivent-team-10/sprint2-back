import { prisma } from './seed';

async function createAccommodations() {
  let accommodations = await prisma.accommodation.findMany();
  if (!accommodations.length) {
    await prisma.accommodation.createMany({
      data: [
        {
          name: 'Driven Resort',
          capacity: 125,
          image: 'https://user-images.githubusercontent.com/48726063/173424008-532f1dc7-b816-4935-88fe-26bacb1f5082.png',
        },
        {
          name: 'Driven Palace',
          capacity: 125,
          image: 'https://user-images.githubusercontent.com/48726063/173424145-eb090753-e976-4adf-a653-960b2130ac5c.png',
        }, 
        {
          name: 'Driven World',
          capacity: 125,
          image: 'https://user-images.githubusercontent.com/48726063/173424274-74ce570a-631d-4241-afe8-7316016866bc.png',
        },
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
