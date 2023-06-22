import { Router } from 'express';
import {
  competidorRoutes,
  eventRoutes,
  subscription,
} from './routes/competidor.routes';

const router = Router();

router.use('/competidor', competidorRoutes);

router.use('/event', eventRoutes);

router.use('/subscription', subscription);

export default router;
