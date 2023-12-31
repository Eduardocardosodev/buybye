import { DbCompetidorRepository } from '../Repositories/CompetidorRepository';
import { CompetidorDTO, CreateCompetidorDTO } from '../dto/CompetidorDTO';
import { Competidor } from '../entities/Competidor';
import { CompetitorNotFound } from '../errors/CompetitorNotFound';
import { hash } from 'bcryptjs';

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
      senha: competitorDTO.senha,
      email: competitorDTO.email,
    };
  }

  public async realizarSorteio(idEvento: number): Promise<Competidor[]> {
    const inscricoes = await this.competitorRepository.findByEvento(idEvento);

    const competidores = inscricoes.map((inscricao) => {
      return {
        competidor: inscricao.competidorCab,
        nivelTotal:
          (inscricao.competidorCab ? inscricao.competidorCab.nivel_cabeca : 0) +
          (inscricao.competidorPe ? inscricao.competidorPe.nivel_pe : 0),
      };
    });

    competidores.sort((a, b) => a.nivelTotal - b.nivelTotal);

    const competidoresNonNull = competidores.filter(
      (item) => item.competidor !== null
    );

    return competidoresNonNull.slice(0, 2).map((item) => item.competidor!);
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
    const password_hash = await hash(competitorDTO.senha, 6);

    const createCompetitor = await this.competitorRepository.createCompetitor({
      nome_competidor: competitorDTO.nome_competidor,
      nivel_cabeca: competitorDTO.nivel_cabeca,
      nivel_pe: competitorDTO.nivel_pe,
      senha: password_hash,
      email: competitorDTO.email,
    });

    return this.mapCompetitorDTOToCompetitor(createCompetitor);
  }
}
