import { prisma } from "./seed";

async function createRooms() {
  const typesBody = []
  for (let i = 0; i < 65; i++) {
    let body = {
      number: i + 1,
      occupation: 0,
      typeId: 0,
      accommodationId: 1,
    }

    if (i < 20) {
      body.typeId = 3;
    } else if (i < 40) {
      body.typeId = 2;
    } else {
      body.typeId = 1;
    }

    typesBody.push(body);
  }

  const typesBody2 = typesBody.map((accommodation) => ({...accommodation, accommodationId: 2 }));
  const typesBody3 = typesBody.map((accommodation) => ({...accommodation, accommodationId: 3 }));

  let room = await prisma.room.findMany();
  if (!room.length) {
      await prisma.room.createMany({
      data: [ ...typesBody, ...typesBody2, ...typesBody3],
      skipDuplicates: true
    })
    room = await prisma.room.findMany();
  }

  return room;
}

export {
  createRooms,
};
