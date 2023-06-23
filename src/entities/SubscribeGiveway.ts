import { Competidor } from './Competidor';
import { Events } from './Events';

export class InscricaoSorteio {
  id: number;
  competidorCab: Competidor | null;
  competidorPe: Competidor | null;
  qtd_inscricao: number;
  evento: Events | null;

  constructor(
    id: number,
    competidorCab: Competidor | null,
    competidorPe: Competidor | null,
    qtd_inscricao: number,
    evento: Events | null
  ) {
    this.id = id;
    this.competidorCab = competidorCab;
    this.competidorPe = competidorPe;
    this.qtd_inscricao = qtd_inscricao;
    this.evento = evento;
  }
}
