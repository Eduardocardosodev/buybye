import { DbEventWithRulesRepository } from '../Repositories/EventWithRulesRepository';
import { DbEventsRepository } from '../Repositories/EventsRepository';
import { DbRulesRepository } from '../Repositories/RulesRepository';
import { AwardDTO, CreateAwardDTO } from '../dto/Award';
import { CreateCompetidorDTO } from '../dto/CompetidorDTO';
import { CreateEventDTO, EventDTO } from '../dto/EventDTO';
import { CreateRuleDTO, RuleDTO } from '../dto/RuleDTO';
import { Events } from '../entities/Events';
import { EventAlreadyExists } from '../errors/EventAlreadyExists';
import { EventNotFound } from '../errors/EventNotFound';

export class EventUseCase {
  constructor(
    private eventsRepository: DbEventsRepository,
    private ruleRepository: DbRulesRepository,
    private eventsRulesRepository: DbEventWithRulesRepository
  ) {
    this.eventsRepository = eventsRepository;
    this.ruleRepository = ruleRepository;
    this.eventsRulesRepository = eventsRulesRepository;
  }

  private mapPrismaEventToEventDTO(prismaUser: EventDTO): Events {
    return {
      id: prismaUser.id,
      nome_evento: prismaUser.nome_evento,
      vlr_inscricao: prismaUser.vlr_inscricao,
      qtd_inscricao_sorteio: prismaUser.qtd_inscricao_sorteio,
      data_hr_prova: prismaUser.data_hr_prova,
    };
  }

  private mapPrismaEventToEventWithRulesDTO(prismaUser: EventDTO): Events {
    console.log('teste');
    return {
      id: prismaUser.id,
      nome_evento: prismaUser.nome_evento,
      vlr_inscricao: prismaUser.vlr_inscricao,
      qtd_inscricao_sorteio: prismaUser.qtd_inscricao_sorteio,
      data_hr_prova: prismaUser.data_hr_prova,
      regras:
        prismaUser.regrasEvento?.map((ruleDTO: RuleDTO) => {
          console.log('ruleDTO:', ruleDTO);

          return {
            id: ruleDTO.id,
            id_evento: ruleDTO.id_evento,
            qtd_corrida: ruleDTO.qtd_corrida,
            soma_nivel: ruleDTO.soma_nivel,
          };
        }) || [],
      premios:
        prismaUser.premios?.map((awardDTO: AwardDTO) => {
          return {
            id: awardDTO.id,
            id_evento: awardDTO.id_evento,
            posicao: awardDTO.posicao,
            premio: awardDTO.premio,
          };
        }) || [],
    };
  }

  public async getEvents(): Promise<Events[]> {
    const events = await this.eventsRepository.getEvents();

    if (events.length === 0) {
      throw new EventNotFound();
    }

    return events.map((eventDTO) =>
      this.mapPrismaEventToEventWithRulesDTO(eventDTO)
    );
  }

  public async getEvent(id: number): Promise<Events> {
    const event = await this.eventsRepository.getEvent(id);

    if (!event) {
      throw new EventNotFound();
    }

    return this.mapPrismaEventToEventDTO(event);
  }

  public async createEvent(
    data: CreateEventDTO,
    dataRule: CreateRuleDTO
  ): Promise<Events> {
    const eventExists = await this.eventsRepository.getNameEvent(
      data.nome_evento
    );

    if (eventExists) {
      throw new EventAlreadyExists();
    }

    const createEvent = await this.eventsRepository.createEvent(data);

    await this.ruleRepository.createRule(dataRule);

    return this.mapPrismaEventToEventDTO(createEvent);
  }

  public async deleteEvent(id: number): Promise<void> {
    const eventExists = await this.eventsRepository.getEvent(id);

    const deleteEvent = await this.eventsRepository.deleteEvent(id);

    if (!eventExists) {
      throw new EventNotFound();
    }
  }

  public async createEventWithRules(
    eventData: CreateEventDTO,
    ruleData: CreateRuleDTO[],
    awardData: CreateAwardDTO[]
  ): Promise<Events> {
    const createdEvent = await this.eventsRulesRepository.createEventWithRules(
      eventData,
      ruleData,
      awardData
    );
    // Processar outras ações ou retornar o evento criado, se necessário
    return createdEvent;
  }
}
