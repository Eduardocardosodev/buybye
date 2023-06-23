import { Request, Response } from 'express';
import { EventUseCase } from '../Services/Event-use-case';
import { Events } from '../entities/Events';
import { EventNotFound } from '../errors/EventNotFound';
import { EventAlreadyExists } from '../errors/EventAlreadyExists';
import { makeCompetitorUseCase } from '../Services/factories/make-competitor-use-case';
import { makeEventUseCase } from '../Services/factories/make-event-use-case';
import { GivewayUseCase } from '../Services/Giveway-use-case';

export class GivewayController {
  private givewayUseCase: GivewayUseCase;

  constructor(givewayUseCase: GivewayUseCase) {
    this.givewayUseCase = givewayUseCase;
  }

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      // const eventUseCase = makeEventUseCase();

      const { qtd_inscricao, id_evento } = req.body;

      const selectedCompetitorId = req.competitor?.id || null;
      const isCabeca = req.body.escolha === 'cabeca';

      await this.givewayUseCase.createGiveway(
        {
          id_compet_cabeca: isCabeca ? selectedCompetitorId : null,
          id_compet_pe: !isCabeca ? selectedCompetitorId : null,
          qtd_inscricao,
        },
        id_evento
      );

      res.status(201).json({ message: 'Inscrito com sucesso.' });
    } catch (error: any) {
      if (error instanceof EventNotFound) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof EventAlreadyExists) {
        res.status(400).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao criar Evento' });
      }
    }
  };
}
