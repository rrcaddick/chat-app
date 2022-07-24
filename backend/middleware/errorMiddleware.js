const errorHandler = async (error, req, res, next) => {
  const development = process.env.NODE_ENV === "development";
  const statusCode = res.statusCode || 500;

  res.status(statusCode).json({
    message: error.message,
    validationErrors: req?.validationErrors || undefined,
    stack: development ? error.stack : undefined,
  });
};

module.exports = errorHandler;
