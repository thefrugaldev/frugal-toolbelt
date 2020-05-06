import express from "express";

interface CustomError extends Error {
  status?: number;
  errors?: any[];
}

/*
Try/Catch Errors Handler
*/
const catchErrors = (fn: any) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return fn(req, res, next).catch(next);
  };
};

/*
Not Found Error Handler
*/
const notFoundErrors = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const err: CustomError = new Error("Not Found");
  err.status = 404;

  next(err);
};

/*
MongoDB Validation Error Handler
*/
const flashValidationErrors = (
  err: CustomError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!err.errors) return next(err);

  const errorKeys = Object.keys(err.errors);

  res.send(errorKeys);
};

/*
Development Error Handler
*/
const developmentErrors = (
  err: CustomError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  err.stack = err.stack || "";

  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    ),
  };

  res.status(err.status || 500);
  res.format({
    "application/json": () => res.json(errorDetails),
  });
};

/*
Production Error Handler
*/
const productionErrors = (
  err: CustomError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(err.status || 500);
  res.send(err.message);
};

export {
  catchErrors,
  notFoundErrors,
  flashValidationErrors,
  developmentErrors,
  productionErrors,
};
