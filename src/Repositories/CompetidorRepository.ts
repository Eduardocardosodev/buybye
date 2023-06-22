import { prismaClient } from '../database/prisma';
import { CompetidorDTO, CreateCompetidorDTO } from '../dto/CompetidorDTO';
import { Competidor } from '../entities/Competidor';
import { CompetitorRepository } from './competitor-repository';

export class DbCompetidorRepository implements CompetitorRepository {
  private mapPrismaCompetidorToUserDTO(prismaUser: Competidor): CompetidorDTO {
    return {
      id: prismaUser.id,
      nome_competidor: prismaUser.nome_competidor,
      nivel_cabeca: prismaUser.nivel_cabeca,
      nivel_pe: prismaUser.nivel_pe,
      senha: prismaUser.senha,
      email: prismaUser.email,
    };
  }

  public async getCompetidores(): Promise<CompetidorDTO[]> {
    return await prismaClient.competidores.findMany({
      orderBy: [{ id: 'desc' }],
    });
  }

  public async findByEmail(email: string): Promise<Competidor | null> {
    return await prismaClient.competidores.findUnique({
      where: {
        email,
      },
    });
  }

  public async getCompetitor(id: number): Promise<CompetidorDTO | null> {
    return await prismaClient.competidores.findUnique({
      where: { id },
    });
  }

  public async createCompetitor(
    competitorDTO: CreateCompetidorDTO
  ): Promise<CompetidorDTO> {
    return await prismaClient.competidores.create({
      data: competitorDTO,
    });
  }
}
