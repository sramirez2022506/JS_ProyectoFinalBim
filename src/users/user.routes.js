import {Router} from "express";
import {check} from "express-validator";
import {
    existEmail,
    existUserById,
    existUser
} from "../helpers/db-validator.js";
import {validateJWT} from "../middlewares/validate-jwt.js";
import {
    confirmAction,
    validateFields
} from "../middlewares/validate-fields.js";
import { updateRoleUser, updateUser } from "./user.controller.js";
import {hasRole} from "../middlewares/validate-role.js";
import{
    UpdateClient,
    deleteUserClient,
    deleteUser,
    getUser,
    register
} from "../users/user.controller.js";


const router = Router();

router.get("/", validateJWT, hasRole, getUser);

router.post(
    "/register",
    [
        check("name", "The name cannot be empty").not().isEmpty(),
        check("name").custom(existUser),
        check("email", "The email cannont be empty").not().isEmpty(),
        check("email").custom(existEmail),
        check("password", "The password cannot be empty").not().isEmpty(),
        validateFields
    ],
    register
);

router.put(
    "/update-role/:id",
    validateJWT,
    hasRole,
    [
        check("id", "The id is not valid").isMongoId(),
        check("id").custom(existUserById),
        check("role", "The role cannot be empty").not().isEmpty(),
        validateFields
    ],
    updateRoleUser
);

router.put(
    "/update-info/:id",
    validateJWT,
    hasRole,
    [
        check("id", "The user id is required").not().isEmpty(),
        check("id").custom(existUserById),
        validateFields
    ],
    updateUser
);

router.delete(
    "/delete-user/:id",
    validateJWT,
    hasRole,
    [
        check("id", "The user id is required").not().isEmpty(),
        check("id").custom(existUserById),
        validateFields
    ],
    deleteUser
);

router.put(
    "/profile-config",
    validateJWT,
    [
        validateFields
    ],
    UpdateClient
);

router.delete(
    "/profile-config",
    validateJWT,
    [
        confirmAction
    ],
    deleteUserClient
);

export default router;