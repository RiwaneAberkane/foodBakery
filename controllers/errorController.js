const errorHandler = (err, req, res, next) => {
  // Log the error
  console.error(err.stack);

  // Set the status code and error message
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  // Send the error response
  res.status(statusCode).json({ error: errorMessage });
};

module.exports = errorHandler;

// const errorController = (req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// };

// module.exports = errorController;
