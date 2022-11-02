import { NextFunction, Request, Response } from 'express';

import ErrorGenerate from '../utils/ErrorGenerate';

export default (err: ErrorGenerate & Error, req: Request, res: Response, _next: NextFunction) => {
  if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });

  return res.status(500).json(err.message);
};
