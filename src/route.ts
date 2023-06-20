import { Router } from 'express';
import competidorRoutes from './routes/competidor.routes';

const router = Router();

router.use('/competidor', competidorRoutes);

export default router;
