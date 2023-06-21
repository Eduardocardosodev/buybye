export class EventAlreadyExists extends Error {
  constructor() {
    super('Evento já existe, escolha outro nome!');
    this.name = 'EventAlreadyExists';
  }
}
