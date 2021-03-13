import { validationResult } from "express-validator";

const validarCampos = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }

    next();
}

export {validarCampos};