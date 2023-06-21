import { prismaClient } from '../database/prisma';
import { AwardDTO, CreateAwardDTO } from '../dto/Award';
import { CreateEventDTO, EventDTO } from '../dto/EventDTO';
import { CreateRuleDTO, RuleDTO } from '../dto/RuleDTO';
import { EventRulesRepository } from './event-rules-repository';
import { RulesRepository } from './rules-repository';

export class DbEventWithRulesRepository implements EventRulesRepository {
  public async createEventWithRules(
    eventData: CreateEventDTO,
    ruleData: CreateRuleDTO[],
    awardData: CreateAwardDTO[]
  ): Promise<EventDTO> {
    let createdEvent: EventDTO | null = null;
    let createdRules: RuleDTO[] = [];
    let createdAwards: AwardDTO[] = [];

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
          for (const award of awardData) {
            const { posicao, premio } = award;
            const createdAward = await prisma.premios.create({
              data: {
                posicao,
                premio,
                evento: {
                  connect: {
                    id: createdEvent.id,
                  },
                },
              },
            });
            createdAwards.push(createdAward);
          }
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
