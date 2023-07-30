import { Request, Response, NextFunction } from "express";

import { RouteNotFound } from "../Models/Clients-Errors";

const ErrorHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const err = new RouteNotFound(request.originalUrl);
  next(err);
  
};

export default ErrorHandler;
