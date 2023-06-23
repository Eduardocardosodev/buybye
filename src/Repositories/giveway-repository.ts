import { Giveway } from '../entities/Giveway';
import { GivewayDTO } from '../dto/Giveway';

export interface GivewayRepository {
  createGiveway(data: GivewayDTO, id_evento: number): Promise<Giveway>;
}
