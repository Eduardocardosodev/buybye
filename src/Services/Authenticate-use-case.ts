import { compare } from 'bcryptjs';
import { DbCompetidorRepository } from '../Repositories/CompetidorRepository';
import { Competidor } from '../entities/Competidor';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';
import JWT from 'jsonwebtoken';

interface AuthenticateUseCaseRequest {
  email: string;
  senha: string;
}

interface AuthenticateUseCaseResponse {
  competitor: Competidor;
  token: string;
}

export class AuthenticateUseCase {
  constructor(private competitorRepository: DbCompetidorRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const competitor = await this.competitorRepository.findByEmail(email);

    if (!competitor) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(senha, competitor.senha);

    const token = JWT.sign(
      {
        id: competitor.id,
        nome_competidor: competitor.nome_competidor,
        nivel_cabeca: competitor.nivel_cabeca,
        nivel_pe: competitor.nivel_pe,
        email: competitor.email,
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '1h',
      }
    );

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      competitor,
      token,
    };
  }
}
