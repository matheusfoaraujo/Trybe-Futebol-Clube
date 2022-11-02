import { NextFunction, Request, Response } from 'express';

import ErrorGenerate from '../utils/ErrorGenerate';

export default (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  console.log('error:', error);

  if (error) next(new ErrorGenerate(error.message, 400));

  next();
};
