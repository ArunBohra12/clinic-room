import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import globalErrorMiddleware from './controllers/errors/errorController';
import doctorRoutes from './routes/doctorRoutes';

const app = express();

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/doctors', doctorRoutes);

// 404 error for route not found
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't ${req.method} ${req.path}`,
  });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  globalErrorMiddleware(err, req, res);
});

export default app;
