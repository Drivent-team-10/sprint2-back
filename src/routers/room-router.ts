import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import { getRooms, updateOccupation } from '@/controllers/rooms-controller';

const roomsRouter = Router();

roomsRouter.get('/accommodation/:id', getRooms);
roomsRouter.post('/:room/reservation/:reservation', updateOccupation);
export { roomsRouter };
