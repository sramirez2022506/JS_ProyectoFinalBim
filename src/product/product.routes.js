import {Router} from "express";
import {check} from "express-validator";
import {
    existProduct,
    existProductName
} from "../helpers/db-validator.js";