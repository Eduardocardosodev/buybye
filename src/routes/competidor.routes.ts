import { Router } from 'express';
import { CompetitorController } from '../Controllers/CompetitorController';
import { CompetitorService } from '../Services/CompetitorService';
import { DbCompetidorRepository } from '../Repositories/CompetidorRepository';
import { EventUseCase } from '../Services/Event-use-case';
import { DbEventsRepository } from '../Repositories/EventsRepository';
import { EventController } from '../Controllers/EventController';
import { DbRulesRepository } from '../Repositories/RulesRepository';
import { DbEventWithRulesRepository } from '../Repositories/EventWithRulesRepository';
import { GivewayController } from '../Controllers/GivewayController';
import { DbGivewayRepository } from '../Repositories/GivewayRepository';
import { GivewayUseCase } from '../Services/Giveway-use-case';
import { AuthenticateController } from '../Controllers/AuthenticateController';
import { authMiddleware } from '../middlewares/auth';

export const competidorRoutes = Router();
export const eventRoutes = Router();
export const subscription = Router();

const competitorRepository = new DbCompetidorRepository();
const competitor = new CompetitorService(competitorRepository);
const competitorController = new CompetitorController(competitor);

const authenticateController = new AuthenticateController();

const ruleRepository = new DbRulesRepository();
const eventRulesRepository = new DbEventWithRulesRepository();

const eventRepository = new DbEventsRepository();
const event = new EventUseCase(
  eventRepository,
  ruleRepository,
  eventRulesRepository
);
const eventController = new EventController(event);

const givewayRepository = new DbGivewayRepository();
const giveway = new GivewayUseCase(givewayRepository);
const givewayController = new GivewayController(giveway);

competidorRoutes.get('/', authMiddleware, competitorController.index);
competidorRoutes.get('/:id', authMiddleware, competitorController.show);
competidorRoutes.post('/', competitorController.insert);
competidorRoutes.post('/sessions', authenticateController.authenticate);

// competidorRoutes.put('/:id');
// competidorRoutes.delete('/:id');

eventRoutes.get('/', authMiddleware, eventController.index);
eventRoutes.get('/:id', authMiddleware, eventController.show);
eventRoutes.post('/', authMiddleware, eventController.insert);
// competidorRoutes.put('/:id');
eventRoutes.delete('/:id', authMiddleware, eventController.delete);

// subscription.get('/', givewayController.index);
// subscription.get('/:id', givewayController.show);
subscription.post('/', authMiddleware, givewayController.insert);
// competidorRoutes.put('/:id');
// subscription.delete('/:id', givewayController.delete);
