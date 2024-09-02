
export const authenticateXApiKey = (req, res, next) => {
    console.log('in auth');
    const token = req?.headers['x-api-key'];
    console.log({token});
    if (token && token === process.env.X_API_KEY) {
        return next();
    }

    res.status(401).json({
        status: "error",
        message: "Unauthorized access",
    });
}