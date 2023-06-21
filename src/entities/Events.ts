import Decimal from 'decimal.js';
import { Rules } from './Rules';

export class Events {
  id: number;
  nome_evento: string;
  vlr_inscricao: Decimal;
  qtd_inscricao_sorteio: number;
  data_hr_prova: Date;
  regras?: Rules[];

  constructor(
    id: number,
    nome_evento: string,
    vlr_inscricao: Decimal,
    qtd_inscricao_sorteio: number,
    data_hr_prova: Date,
    regras?: Rules[]
  ) {
    this.id = id;
    this.nome_evento = nome_evento;
    this.vlr_inscricao = vlr_inscricao;
    this.qtd_inscricao_sorteio = qtd_inscricao_sorteio;
    this.data_hr_prova = data_hr_prova;
    this.regras = regras;
  }
}
