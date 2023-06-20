import { DbCompetidorRepository } from '../Repositories/CompetidorRepository';
import { CompetidorDTO, CreateCompetidorDTO } from '../dto/CompetidorDTO';
import { Competidor } from '../entities/Competidor';
import { CompetitorNotFound } from '../errors/CompetitorNotFound';

export class CompetitorService {
  constructor(private competitorRepository: DbCompetidorRepository) {}

  private mapCompetitorDTOToCompetitor(
    competitorDTO: CompetidorDTO
  ): Competidor {
    return {
      id: competitorDTO.id,
      nome_competidor: competitorDTO.nome_competidor,
      nivel_cabeca: competitorDTO.nivel_cabeca,
      nivel_pe: competitorDTO.nivel_pe,
    };
  }

  public async getCompetitors(): Promise<Competidor[]> {
    const competitors = await this.competitorRepository.getCompetidores();

    if (competitors.length === 0) {
      throw new CompetitorNotFound();
    }

    return competitors.map((competitorDTO) =>
      this.mapCompetitorDTOToCompetitor(competitorDTO)
    );
  }

  public async getCompetitor(id: number): Promise<Competidor> {
    const competitor = await this.competitorRepository.getCompetitor(id);

    if (!competitor) {
      throw new CompetitorNotFound();
    }

    return this.mapCompetitorDTOToCompetitor(competitor);
  }

  public async createCompetitor(
    competitorDTO: CreateCompetidorDTO
  ): Promise<Competidor> {
    const createCompetitor = await this.competitorRepository.createCompetitor(
      competitorDTO
    );

    return this.mapCompetitorDTOToCompetitor(createCompetitor);
  }
}
