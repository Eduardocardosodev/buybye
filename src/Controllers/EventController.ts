import { Request, Response } from 'express';
import { EventUseCase } from '../Services/Event-use-case';
import { Events } from '../entities/Events';
import { EventNotFound } from '../errors/EventNotFound';
import { EventAlreadyExists } from '../errors/EventAlreadyExists';
import { makeCompetitorUseCase } from '../Services/factories/make-competitor-use-case';
import { makeEventUseCase } from '../Services/factories/make-event-use-case';

export class EventController {
  private eventUseCase: EventUseCase;

  constructor(eventUseCase: EventUseCase) {
    this.eventUseCase = eventUseCase;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const event = await this.eventUseCase.getEvents();

      res.status(200).json({ event });
    } catch (error: any) {
      if (error instanceof EventNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar competidores' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const event = await this.eventUseCase.getEvent(Number(id));

      res.status(200).json({ event });
    } catch (error: any) {
      if (error instanceof EventNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar competidor' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      // const eventUseCase = makeEventUseCase();

      const {
        nome_evento,
        vlr_inscricao,
        qtd_inscricao_sorteio,
        data_hr_prova,
        regras,
      } = req.body;

      const { id_evento, qtd_corrida, soma_nivel } = req.body.regras;

      await this.eventUseCase.createEventWithRules(
        {
          nome_evento,
          vlr_inscricao,
          qtd_inscricao_sorteio,
          data_hr_prova,
        },
        regras
      );

      res.status(201).json({ message: 'Evento criado com sucesso.' });
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

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const event = await this.eventUseCase.deleteEvent(Number(id));

      res.status(200).json({ event });
    } catch (error: any) {
      if (error instanceof EventNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar competidor' });
      }
    }
  };
}
