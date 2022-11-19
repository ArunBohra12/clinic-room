import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import db from '../../database';
import AppError from '../../utils/appError';
import catchAsync from '../../utils/catchAsync';

export const applyAsDoctor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, category, age } = req.body;
  const doctorId = uuidv4();

  if (!name || !email || !category || !age) {
    return next(new AppError('Please provide all the details', 400));
  }

  const query = 'INSERT INTO DOCTORS (ID, NAME, EMAIL, CATEGORY, AGE) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [doctorId, name, email, category, age];

  // prettier-ignore
  const { rows: [doctor] } = await db.query(query, values);

  res.status(201).json({
    status: 'success',
    data: doctor,
  });
});

export const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const { ratings = 'asc' } = req.query;
  const query = `SELECT * FROM DOCTORS WHERE IS_VERIFIED=FALSE ORDER BY RATINGS ${ratings === 'asc' ? 'ASC' : 'DESC'}`;

  const { rows: doctors } = await db.query(query);

  res.status(200).json({
    status: 'success',
    data: doctors,
  });
});

export const getOneDoctors = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { doctorId } = req.params;

  if (!doctorId) {
    return next(new AppError('Please provide a doctor Id', 400));
  }

  const query = 'SELECT * FROM DOCTORS WHERE ID=$1';
  const values = [doctorId];

  // prettier-ignore
  const { rows: [doctors] } = await db.query(query, values);

  res.status(200).json({
    status: 'success',
    data: doctors,
  });
});
