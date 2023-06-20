export interface CreateCompetidorDTO {
  id?: number;
  nome_competidor: string;
  nivel_cabeca: number;
  nivel_pe: number;
}

export interface CompetidorDTO {
  id: number;
  nome_competidor: string;
  nivel_cabeca: number;
  nivel_pe: number;
}
