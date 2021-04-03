import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import BaseRouter from './routes';

import 'express-async-errors';

import logger from '@shared/logger';
import { User } from '@entities/User';

const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

//cors
app.use(cors());

// Database
createConnection({
    type: 'mysql',
    database: 'E-commerce',
    username: 'root',
    password: '',
    logging: true,
    synchronize: true,
    entities: [User]
})

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;