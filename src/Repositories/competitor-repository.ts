import { Competidor } from '../entities/Competidor';
import { CreateCompetidorDTO } from '../dto/CompetidorDTO';

export interface CompetitorRepository {
  getCompetidores(): Promise<Competidor[]>;
  getCompetitor(id: number): Promise<Competidor | null>;
  createCompetitor(data: CreateCompetidorDTO): Promise<Competidor>;
  findByEmail(email: string): Promise<Competidor | null>;
}
