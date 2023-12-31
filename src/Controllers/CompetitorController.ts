import { Request, Response } from 'express';
import { CompetitorService } from '../Services/CompetitorService';
import { Competidor } from '../entities/Competidor';
import { CompetitorNotFound } from '../errors/CompetitorNotFound';
import { makeCompetitorUseCase } from '../Services/factories/make-competitor-use-case';

export class CompetitorController {
  private competitorService: CompetitorService;

  constructor(competitorService: CompetitorService) {
    this.competitorService = competitorService;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const competitor = await this.competitorService.getCompetitors();

      res.status(200).json({ competitor });
    } catch (error: any) {
      if (error instanceof CompetitorNotFound) {
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

      const competitor = await this.competitorService.getCompetitor(Number(id));

      res.status(200).json({ competitor });
    } catch (error: any) {
      if (error instanceof CompetitorNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar competidores' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const competitorUseCase = makeCompetitorUseCase();

      const { nome_competidor, nivel_cabeca, nivel_pe, senha, email } =
        req.body;

      await competitorUseCase.createCompetitor({
        nome_competidor,
        nivel_cabeca,
        nivel_pe,
        senha,
        email,
      });

      res.status(201).json({ message: 'Competidor criado com sucesso.' });
    } catch (error: any) {
      //errors about createCompetitor
      console.log(error.message);
    }
  };

  public realizarSorteio = async (req: Request, res: Response) => {
    const idEvento = Number(req.params.id);

    try {
      const competidoresSorteados =
        await this.competitorService.realizarSorteio(idEvento);

      return res.status(200).json({
        competidoresSorteados,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        error: 'Erro ao realizar o sorteio.',
      });
    }
  };
}
