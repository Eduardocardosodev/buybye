import { PrismaClient } from '@prisma/client';
import { GivewayRepository } from './giveway-repository';
import { GivewayDTO } from '../dto/Giveway';
import { Giveway } from '../entities/Giveway';
import { prismaClient } from '../database/prisma';

export class DbGivewayRepository implements GivewayRepository {
  async createGiveway(data: GivewayDTO, id_evento: number): Promise<Giveway> {
    const giveway = await prismaClient.inscricaoSorteio.create({
      data: {
        id_compet_cabeca: data.id_compet_cabeca,
        id_compet_pe: data.id_compet_pe,
        qtd_inscricao: data.qtd_inscricao,
        id_evento,
      },
    });

    const givewayDTO: Giveway = {
      id: giveway.id,
      id_compet_cabeca: giveway.id_compet_cabeca,
      id_compet_pe: giveway.id_compet_pe,
      qtd_inscricao: giveway.qtd_inscricao,
      id_evento: giveway.id_evento,
    };

    return givewayDTO;
  }
}
