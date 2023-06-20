export class Competidor {
  id: number;
  nome_competidor: string;
  nivel_cabeca: number;
  nivel_pe: number;

  constructor(
    id: number,
    nome_competidor: string,
    nivel_cabeca: number,
    nivel_pe: number
  ) {
    this.id = id;
    this.nome_competidor = nome_competidor;
    this.nivel_cabeca = nivel_cabeca;
    this.nivel_pe = nivel_pe;
  }
}
