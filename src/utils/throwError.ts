import { NextFunction } from "express";

const throwError = (
  next: NextFunction,
  error: any,
  message = "Server Error Default",
  statusCode = 500
) => {
  let err: any;
  err = new Error(message);
  if (!error) {
    err.statusCode = statusCode;
  } else {
    err.statusCode = error?.statusCode || 500;
  }

  next(err);
};

export default throwError;
