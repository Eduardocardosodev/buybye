import { Rules } from '../entities/Rules';
import { CreateRuleDTO, RuleDTO } from '../dto/RuleDTO';
import { CreateEventDTO, EventDTO } from '../dto/EventDTO';
import { CreateAwardDTO } from '../dto/Award';

export interface EventRulesRepository {
  createEventWithRules(
    eventData: CreateEventDTO,
    ruleData: CreateRuleDTO[],
    awardData: CreateAwardDTO[]
  ): Promise<EventDTO>;
}
