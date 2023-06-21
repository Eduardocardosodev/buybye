import { Rules } from '../entities/Rules';
import Decimal from 'decimal.js';
import { RuleDTO } from './RuleDTO';
import { AwardDTO } from './Award';

export interface CreateEventDTO {
  id?: number;
  nome_evento: string;
  vlr_inscricao: Decimal;
  qtd_inscricao_sorteio: number;
  data_hr_prova: Date;
}

export interface EventDTO {
  id: number;
  nome_evento: string;
  vlr_inscricao: Decimal;
  qtd_inscricao_sorteio: number;
  data_hr_prova: Date;
  regrasEvento?: RuleDTO[];
  premios?: AwardDTO[];
}
