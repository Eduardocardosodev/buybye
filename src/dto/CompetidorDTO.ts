export interface CreateCompetidorDTO {
  id?: number;
  nome_competidor: string;
  nivel_cabeca: number;
  nivel_pe: number;
  senha: string;
  email: string;
}

export interface CompetidorDTO {
  id: number;
  nome_competidor: string;
  nivel_cabeca: number;
  nivel_pe: number;
  senha: string;
  email: string;
}
