const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: "error",
        message: err.message || "Internal server error",
    });
}

export default errorHandler;
