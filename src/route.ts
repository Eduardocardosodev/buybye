import { Router } from 'express';
import { competidorRoutes, eventRoutes } from './routes/competidor.routes';

const router = Router();

router.use('/competidor', competidorRoutes);

router.use('/event', eventRoutes);

export default router;
