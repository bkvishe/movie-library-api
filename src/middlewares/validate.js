const validate = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: error.details
            });
        } else {
            next();
        }
    };
};

export default validate;
