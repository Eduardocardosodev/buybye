import { Rules } from '../entities/Rules';
import { CreateRuleDTO, RuleDTO } from '../dto/RuleDTO';
import { CreateEventDTO, EventDTO } from '../dto/EventDTO';

export interface AwardRepository {
  createEventWithRules(
    eventData: CreateEventDTO,
    ruleData: CreateRuleDTO[]
  ): Promise<EventDTO>;
}
