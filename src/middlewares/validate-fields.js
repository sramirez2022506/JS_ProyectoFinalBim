import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }

    next();
};

export const confirmAction = (req, res, next) =>{
    const {confirmation} = req.body;
    if(!confirmation || confirmation !== "confirm"){
        return res.status(400).json({
            msg: "Required a confirmation"
        });
    }
    next();
};