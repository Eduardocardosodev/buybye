export class CompetitorNotFound extends Error {
  constructor() {
    super('Competidor não encontrado.');
    this.name = 'CompetitorNotFound';
  }
}
