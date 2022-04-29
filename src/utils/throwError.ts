import { NextFunction } from "express";

const throwError = (
  next: NextFunction,
  error: any,
  message = "Server Error",
  statusCode = 500
) => {
  let err: any;

  if (!error) {
    err = new Error(message);
    err.statusCode = statusCode;
  } else {
    err.statusCode = error?.statusCode || 500;
  }

  next(err);
};

export default throwError;
