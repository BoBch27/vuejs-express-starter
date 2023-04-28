import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error';
import handleExit from './helpers/exitHandler';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
	optionsSuccessStatus: 200,
	credentials: true
}));

app.use(express.json({
  limit: '5mb'
}));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
  
app.use(cookieParser());  

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => handleExit(err, server, 1));
process.on('unhandledRejection', (err) => handleExit(err, server, 1));