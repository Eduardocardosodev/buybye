import { prismaClient } from '../database/prisma';
import { CreateEventDTO, EventDTO } from '../dto/EventDTO';
import { CreateRuleDTO } from '../dto/RuleDTO';
import { Events } from '../entities/Events';
import { EventsRepository } from './events-repository';

export class DbEventsRepository implements EventsRepository {
  public async getEvents(): Promise<EventDTO[]> {
    return await prismaClient.eventos.findMany({
      orderBy: [{ id: 'desc' }],
      include: {
        regrasEvento: true,
      },
    });
  }

  public async getEvent(id: number): Promise<Events | null> {
    return await prismaClient.eventos.findUnique({
      where: { id },
    });
  }

  public async getNameEvent(nome_evento: string): Promise<Events | null> {
    return await prismaClient.eventos.findUnique({
      where: {
        nome_evento,
      },
    });
  }

  public async createEvent(data: CreateEventDTO): Promise<EventDTO> {
    return await prismaClient.eventos.create({
      data,
    });
  }

  public async deleteEvent(id: number): Promise<void> {
    await prismaClient.eventos.delete({
      where: {
        id,
      },
    });
  }
}
