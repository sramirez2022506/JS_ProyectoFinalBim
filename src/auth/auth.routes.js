import { Router } from "express";
import { check } from "express-validator";
import {login} from "./auth.controller.js";
import {emailValid, nameValid} from "../helpers/db-validator.js";
import {validateFields} from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    "/login",
    [   
        check("name", "The name or email is required").not().isEmpty(),
        check("name", "Please use a valid name or email").custom(async (value) =>{
            return (await emailValid(value)) || (await nameValid(value));
        }),
        //check("email", "This email is not valid").isEmail(),
        check("password", "The password is obligatory").not().isEmpty(),
        validateFields,
    ],
    login
);

export default router;