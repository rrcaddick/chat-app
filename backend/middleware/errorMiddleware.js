const errorHandler = async (error, req, res, next) => {
  const development = process.env.NODE_ENV === "development";
  const statusCode = req.statusCode || 500;

  res.status(statusCode).json({
    message: error.message,
    validationErrors: res?.validationErrors || undefined,
    stack: development ? error.stack : undefined,
  });
};

module.exports = errorHandler;
