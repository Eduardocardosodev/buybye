export interface CreateRuleDTO {
  id?: number;
  soma_nivel: number;
  qtd_corrida: number;
  id_evento?: number;
}

export interface RuleDTO {
  id: number;
  soma_nivel: number;
  qtd_corrida: number;
  id_evento: number | null;
}
