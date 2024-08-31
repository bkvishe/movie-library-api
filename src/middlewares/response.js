export const responseToJson = (req, res, next) => {
    res.jsonResponse = (status, data) => {
        res.status(status).json(data);
    };
    next();
};
