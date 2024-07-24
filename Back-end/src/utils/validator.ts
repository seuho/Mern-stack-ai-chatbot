import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({errors: errors.array()})
    }

}

const loginValidator = [
    body("email").trim().isEmail().withMessage("Valid Email is required"),
    body("password").trim().isAlphanumeric().isLength({min: 6}).withMessage("Password should be alphanumeric with a minimum length of 6"),
];

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is required"),
];

export { validate, signupValidator, loginValidator, chatCompletionValidator }