export class Award {
  id: number;
  posicao: number;
  premio: string;
  constructor(id: number, posicao: number, premio: string) {
    this.id = id;
    this.posicao = posicao;
    this.premio = premio;
  }
}
