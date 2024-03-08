import { Router } from "express";
import { check } from "express-validator";
import {login} from "./auth.controller.js";
import {validateFields} from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    "/login",
    [
        check("email", "This email is not valid").isEmail(),
        checkk("password", "The password is obligatory").not().isEmpty(),
        validateFields,
    ],
    login
);

export default router;