export interface CreateAwardDTO {
  id?: number;
  posicao: number;
  premio: string;
  id_evento: number | null;
}

export interface AwardDTO {
  id: number;
  posicao: number;
  premio: string;
  id_evento: number | null;
}
