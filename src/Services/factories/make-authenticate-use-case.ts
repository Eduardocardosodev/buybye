import { DbCompetidorRepository } from '../../Repositories/CompetidorRepository';
import { AuthenticateUseCase } from '../Authenticate-use-case';

export function makeAuthenticateUseCase() {
  const competitorRepository = new DbCompetidorRepository();
  const authenticateUseCase = new AuthenticateUseCase(competitorRepository);
  return authenticateUseCase;
}
