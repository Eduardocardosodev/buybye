import { DbEventsRepository } from '../../Repositories/EventsRepository';
import { EventUseCase } from '../Event-use-case';

export function makeEventUseCase() {
  const eventRepository = new DbEventsRepository();
  const eventUseCase = new EventUseCase(eventRepository);
  return eventUseCase;
}
