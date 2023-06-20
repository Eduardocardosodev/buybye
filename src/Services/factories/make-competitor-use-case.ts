import { DbCompetidorRepository } from '../../Repositories/CompetidorRepository';
import { CompetitorService } from '../CompetitorService';

export function makeCompetitorUseCase() {
  const competitorRepository = new DbCompetidorRepository();
  const competitorUseCase = new CompetitorService(competitorRepository);
  return competitorUseCase;
}
