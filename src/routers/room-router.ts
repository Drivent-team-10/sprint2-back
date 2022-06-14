import { Router } from 'express';

import { authenticateToken } from '@/middlewares';
import { getRooms, updateOccupation } from '@/controllers/rooms-controller';

const roomsRouter = Router();

roomsRouter.get('/accommodation/:id', authenticateToken, getRooms);
roomsRouter.post('/:room/reservation/:reservation', authenticateToken, updateOccupation);
export { roomsRouter };
