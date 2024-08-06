import { Request, Response, NextFunction } from "express";
import { query } from "express-validator";

export const validateGetAppointment = [
  query('id').notEmpty(),
( req: Request, res: Response, next: NextFunction,) { next( ) }
]
