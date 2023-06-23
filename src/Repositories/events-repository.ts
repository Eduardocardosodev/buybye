import { Events } from '../entities/Events';
import { CreateEventDTO } from '../dto/EventDTO';

export interface EventsRepository {
  getEvents(): Promise<Events[]>;
  getEvent(id: number): Promise<Events | null>;
  getNameEvent(name: string): Promise<Events | null>;
  createEvent(data: CreateEventDTO): Promise<Events>;
  deleteEvent(id: number): Promise<void>;
}
