import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let errorCode = (err.code === 11000) ? 409 : null;
  let statusCode = (typeof err.code === 'number' && err.code >= 100 && err.code < 600) ?
    err.code : 500;
  let errorMssg = err.errors ? (<any>Object).values(err.errors)[0]?.properties?.message : null;
  
  res.status(errorCode || statusCode || 500).json({ 
    error: errorMssg || err.message || 'Server Error' 
  });
};
  
export default errorHandler;