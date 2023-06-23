import { Rules } from '../entities/Rules';
import { CreateRuleDTO, RuleDTO } from '../dto/RuleDTO';

export interface RulesRepository {
  createRule(data: CreateRuleDTO): Promise<RuleDTO>;
  deleteRule(id: number): Promise<void>;
}
