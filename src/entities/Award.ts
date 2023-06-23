export class Award {
  id: number;
  posicao: number;
  premio: string;
  id_evento: number | null;

  constructor(
    id: number,
    posicao: number,
    premio: string,
    id_evento: number | null
  ) {
    this.id = id;
    this.posicao = posicao;
    this.premio = premio;
    this.id_evento = id_evento;
  }
}
