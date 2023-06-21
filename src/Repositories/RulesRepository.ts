import { prismaClient } from '../database/prisma';
import { CreateRuleDTO, RuleDTO } from '../dto/RuleDTO';
import { RulesRepository } from './rules-repository';

export class DbRulesRepository implements RulesRepository {
  public async createRule(data: CreateRuleDTO): Promise<RuleDTO> {
    const rule = await prismaClient.regrasEvento.create({
      data: {
        soma_nivel: data.soma_nivel,
        qtd_corrida: data.qtd_corrida,
        id_evento: data.id_evento,
      },
    });

    const ruleDTO: RuleDTO = {
      id: rule.id,
      soma_nivel: rule.soma_nivel,
      qtd_corrida: rule.qtd_corrida,
      id_evento: rule.id_evento,
    };

    return ruleDTO;
  }

  public async deleteRule(id: number): Promise<void> {
    await prismaClient.regrasEvento.delete({
      where: { id },
    });
  }
}
