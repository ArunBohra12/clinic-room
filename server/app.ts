import express, { Request, Response } from 'express';

import globalErrorMiddleware from './controllers/errors/errorController';

const app = express();

app.use((err: Error, req: Request, res: Response) => {
  globalErrorMiddleware(err, req, res);
});

export default app;
