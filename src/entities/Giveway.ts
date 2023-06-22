export class Giveway {
  id: number;
  id_compet_cabeca: number;
  id_compet_pe: number;
  qtd_inscricao: number;
  id_evento: number | null;

  constructor(
    id: number,
    id_compet_cabeca: number,
    id_compet_pe: number,
    qtd_inscricao: number,
    id_evento: number | null
  ) {
    this.id = id;
    this.id_compet_cabeca = id_compet_cabeca;
    this.id_compet_pe = id_compet_pe;
    this.qtd_inscricao = qtd_inscricao;
    this.id_evento = id_evento;
  }
}
