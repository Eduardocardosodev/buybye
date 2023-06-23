import { Request, Response } from 'express';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';
import { makeAuthenticateUseCase } from '../Services/factories/make-authenticate-use-case';

export class AuthenticateController {
  public authenticate = async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
      const authenticateUseCase = makeAuthenticateUseCase();
      const authenticateCompetitor = await authenticateUseCase.execute({
        email,
        senha,
      });

      console.log(authenticateCompetitor.competitor);

      return res.status(200).json({
        competitor: authenticateCompetitor.competitor,
        token: authenticateCompetitor.token,
      });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).json({
          error: error.message,
        });
      }
      throw error;
    }
  };
}
