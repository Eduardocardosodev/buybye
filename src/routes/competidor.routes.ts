import { Router } from 'express';
import { CompetitorController } from '../Controllers/CompetitorController';
import { CompetitorService } from '../Services/CompetitorService';
import { CompetidorRepository } from '../Repositories/CompetidorRepository';

const competidorRoutes = Router();

const competitorRepository = new CompetidorRepository();

const competitor = new CompetitorService(competitorRepository);

const competitorController = new CompetitorController(competitor);

competidorRoutes.get('/', competitorController.index);
competidorRoutes.get('/:id', competitorController.show);
competidorRoutes.post('/', competitorController.insert);
competidorRoutes.put('/:id');
competidorRoutes.delete('/:id');

export default competidorRoutes;
