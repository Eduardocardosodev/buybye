import { prismaClient } from '../database/prisma';
import { CreateEventDTO, EventDTO } from '../dto/EventDTO';
import { CreateRuleDTO, RuleDTO } from '../dto/RuleDTO';
import { EventRulesRepository } from './event-rules-repository';
import { RulesRepository } from './rules-repository';

export class DbEventWithRulesRepository implements EventRulesRepository {
  public async createEventWithRules(
    eventData: CreateEventDTO,
    ruleData: CreateRuleDTO[]
  ): Promise<EventDTO> {
    let createdEvent: EventDTO | null = null;
    let createdRules: RuleDTO[] = [];

    try {
      await prismaClient.$transaction(async (prisma) => {
        // Cria o evento dentro da transação
        createdEvent = await prisma.eventos.create({
          data: eventData,
        });

        console.log(eventData);

        // Cria as regras dentro da transação
        for (const rule of ruleData) {
          console.log(rule, ruleData);

          const { qtd_corrida, soma_nivel } = rule;

          const createdRule = await prisma.regrasEvento.create({
            data: {
              qtd_corrida,
              soma_nivel,
              evento: {
                connect: {
                  id: createdEvent.id,
                },
              },
            },
          });
          createdRules.push(createdRule);
        }
      });
    } catch (error) {
      // Rollback em caso de erro
      throw error;
    }

    if (!createdEvent) {
      throw new Error('Ocorreu um erro ao criar o evento.');
    }
    return Object.assign({}, createdEvent, { regras: createdRules });
  }
}
