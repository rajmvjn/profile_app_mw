const throwError = (next: any, error: any) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  next(error);
};

export default throwError;
