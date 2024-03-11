import {Router} from "express";
import {check} from "express-validator";
import {
    existProduct,
    existProductName
} from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRole } from "../middlewares/validate-role.js";
import {
    getProduct,
    postProduct,
    modifyProduct,
    getProductById,
    deleteProduct,
    outOfStock,
    bestSeller
} from "../product/product.controller.js";

const router = Router();

router.get(
    "/",
    validateJWT,
    hasRole,
    getProduct
);

router.post(
    "/newProduct",
    validateJWT,
    hasRole,
    [
        check("productName", "The product name cannot be empty").not().isEmpty(),
        check("productName").custom(existProductName),
        check("description", "The description cannot be empty").not().isEmpty(),
        check("price", "The price cannot be empty").not().isEmpty(),
        validateFields,
    ],
    postProduct
);

router.put(
    "/modifyProduct/:id",
    validateJWT,
    hasRole,
    [
        check("id", "The id is not valid").isMongoId(),
        check("id").custom(existProduct),
        validateFields
    ],
    modifyProduct
);

router.get(
    "/getProduct/:id",
    validateJWT,
    hasRole,
    [
        check("id", "The id is not valid").isMongoId(),
        check("id").custom(existProduct),
        validateFields
    ],
    getProductById
);

router.delete(
    "deleteProduct/:id",
    validateJWT,
    hasRole,
    [
        check("id", "The id is obligatory").not().isEmpty(),
        check("id").custom(existProduct),
        validateFields
    ],
    deleteProduct
);

router.get(
    "/outOfStock",
    validateJWT,
    hasRole,
    outOfStock
);

router.get(
    "/bestSeller",
    validateJWT,
    hasRole,
    bestSeller
);

export default router;
