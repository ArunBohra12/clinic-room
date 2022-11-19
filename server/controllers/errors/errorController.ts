import { Request, Response } from 'express';

import AppError from '../../utils/appError';

type ErrorResponse = {
  message: string;
  err: Error | AppError;
  stack: any;
  name: string;
  status?: string;
  statusCode?: number;
};

const sendErrorDev = (error: AppError | Error, res: Response) => {
  const resObject: ErrorResponse = {
    err: error,
    message: error.message,
    stack: error.stack,
    name: error.name,
  };

  if (error instanceof AppError) {
    resObject.status = error.status;
    resObject.statusCode = error.statusCode;
  } else {
    let errObj = new AppError(error.message, 500);
    resObject.status = errObj.status;
    resObject.statusCode = errObj.statusCode;
  }

  res.status(resObject.statusCode).json(resObject);
};

const sendErrorProd = (err: Error | AppError, res: Response) => {
  if (err instanceof AppError) {
    // Error was expected in the application
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // This is an unexpected error
  // Log the details and send a generic message to the client
  console.log('🔥 ERROR');
  console.log(err);

  return res.status(500).json({
    status: 'fail',
    message: 'Something went very wrong',
  });
};

const globalErrorMiddleware = (err: AppError | Error, req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};

export default globalErrorMiddleware;
