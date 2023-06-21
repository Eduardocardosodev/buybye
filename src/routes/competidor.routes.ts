import { Router } from 'express';
import { CompetitorController } from '../Controllers/CompetitorController';
import { CompetitorService } from '../Services/CompetitorService';
import { DbCompetidorRepository } from '../Repositories/CompetidorRepository';
import { EventUseCase } from '../Services/Event-use-case';
import { DbEventsRepository } from '../Repositories/EventsRepository';
import { EventController } from '../Controllers/EventController';
import { DbRulesRepository } from '../Repositories/RulesRepository';
import { DbEventWithRulesRepository } from '../Repositories/EventWithRulesRepository';

export const competidorRoutes = Router();
export const eventRoutes = Router();

const competitorRepository = new DbCompetidorRepository();
const competitor = new CompetitorService(competitorRepository);
const competitorController = new CompetitorController(competitor);

const ruleRepository = new DbRulesRepository();
const eventRulesRepository = new DbEventWithRulesRepository();

const eventRepository = new DbEventsRepository();
const event = new EventUseCase(
  eventRepository,
  ruleRepository,
  eventRulesRepository
);

const eventController = new EventController(event);

competidorRoutes.get('/', competitorController.index);
competidorRoutes.get('/:id', competitorController.show);
competidorRoutes.post('/', competitorController.insert);
competidorRoutes.put('/:id');
competidorRoutes.delete('/:id');

eventRoutes.get('/', eventController.index);
eventRoutes.get('/:id', eventController.show);
eventRoutes.post('/', eventController.insert);
// competidorRoutes.put('/:id');
eventRoutes.delete('/:id', eventController.delete);
