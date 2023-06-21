export class Rules {
  id: number;
  soma_nivel: number;
  qtd_corrida: number;
  id_evento: number | null;

  constructor(
    id: number,
    soma_nivel: number,
    qtd_corrida: number,
    id_evento: number | null
  ) {
    this.id = id;
    this.soma_nivel = soma_nivel;
    this.qtd_corrida = qtd_corrida;
    this.id_evento = id_evento;
  }
}
