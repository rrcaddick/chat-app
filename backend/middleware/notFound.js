const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: "The requested url does not exist",
    requestUrl: req.originalUrl,
  });
};

module.exports = notFoundHandler;
