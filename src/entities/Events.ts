import Decimal from 'decimal.js';
import { Rules } from './Rules';
import { Award } from './Award';

export class Events {
  id: number;
  nome_evento: string;
  vlr_inscricao: Decimal;
  qtd_inscricao_sorteio: number;
  data_hr_prova: Date;
  regras?: Rules[];
  premios?: Award[];

  constructor(
    id: number,
    nome_evento: string,
    vlr_inscricao: Decimal,
    qtd_inscricao_sorteio: number,
    data_hr_prova: Date,
    regras?: Rules[],
    premios?: Award[]
  ) {
    this.id = id;
    this.nome_evento = nome_evento;
    this.vlr_inscricao = vlr_inscricao;
    this.qtd_inscricao_sorteio = qtd_inscricao_sorteio;
    this.data_hr_prova = data_hr_prova;
    this.regras = regras;
    this.premios = premios;
  }
}
