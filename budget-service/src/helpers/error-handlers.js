/*
Try/Catch Errors Handler
*/
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
Not Found Error Handler
*/
const notFoundErrors = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;

  next(err);
};

/*
MongoDB Validation Error Handler
*/
const flashValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);

  const errorKeys = Object.keys(err.errors);

  res.send(errorKeys);
};

/*
Development Error Handler
*/
const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || "";

  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    )
  };

  res.status(err.status || 500);
  res.format({
    "application/json": () => res.json(errorDetails)
  });
};

/*
Production Error Handler
*/
const productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
};

module.exports = {
  catchErrors,
  notFoundErrors,
  flashValidationErrors,
  developmentErrors,
  productionErrors
};
