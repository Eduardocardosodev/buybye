import { Competidor } from '../entities/Competidor';
import { CreateCompetidorDTO } from '../dto/CompetidorDTO';
import { InscricaoSorteio } from '../entities/SubscribeGiveway';

export interface CompetitorRepository {
  getCompetidores(): Promise<Competidor[]>;
  getCompetitor(id: number): Promise<Competidor | null>;
  createCompetitor(data: CreateCompetidorDTO): Promise<Competidor>;
  findByEmail(email: string): Promise<Competidor | null>;
  findByEvento(idEvento: number): Promise<InscricaoSorteio[]>;
}
