import { Competidor } from '../src/entities/Competidor';

declare global {
  namespace Express {
    interface Request {
      competitor?: Competidor;
    }
  }
}
