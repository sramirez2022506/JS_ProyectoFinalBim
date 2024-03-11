import { Router } from "express";
import { check } from "express-validator";
import {
  existsCategoryById,
  existsCategoryName,
} from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRole } from "../middlewares/validate-role.js";
import {
  addCategory,
  deleteCategory,
  editCategory,
  listCategories,
} from "./category.controller.js";

const router = Router();

router.post(
  "/new-category",
  validateJWT,
  hasRole,
  [
    check("name", "name cannot be empty").not().isEmpty(),
    check("name").custom(existsCategoryName),
    check("description", "description cannot be empty").not().isEmpty(),
    validateFields,
  ],
  addCategory
);

router.get("/", validateJWT, listCategories);

router.put(
  "/edit-category/:id",
  validateJWT,
  hasRole,
  [
    check("id", "isn't a valid id").isMongoId(),
    check("id").custom(existsCategoryById),
    validateFields,
  ],
  editCategory
);

router.delete(
  "/delete-category/:id",
  validateJWT,
  hasRole,
  [
    check("id", "category id required").not().isEmpty(),
    check("id").custom(existsCategoryById),
    validateFields,
  ],
  deleteCategory
);

export default router;
