import { DbGivewayRepository } from '../Repositories/GivewayRepository';
import { GivewayDTO } from '../dto/Giveway';
import { Giveway } from '../entities/Giveway';

export class GivewayUseCase {
  constructor(private givewayRepository: DbGivewayRepository) {}

  public async createGiveway(
    data: GivewayDTO,
    id_evento: number
  ): Promise<Giveway> {
    return this.givewayRepository.createGiveway(data, id_evento);
  }
}
