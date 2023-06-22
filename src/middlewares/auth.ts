import { NextFunction, Request, Response } from 'express';
import JWT, { Secret } from 'jsonwebtoken';
import { AcessInvalid } from '../errors/AcessInvalid';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //check if token is valid
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // check if header has a token
    if (!token) throw new AcessInvalid();
    const secretKey = process.env.JWT_SECRET_KEY; // Acessando a variável de ambiente

    const verified = await JWT.verify(token, process.env.JWT_SECRET || '');

    req.competitor = verified as string;

    next();
  } catch (error: any) {
    if (error instanceof AcessInvalid) {
      res.status(401).json({ error: error.message });
    } else {
      return res.status(401).json({ error: 'Token de autenticação inválido.' });
    }
  }
}
