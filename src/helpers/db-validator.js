import Bill from "../bills/bill.model.js";
import Category from "../categories/category.model.js";
import Product from "../product/product.model.js";
import User from "../users/user.model.js";

export const existEmail = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email ${email} alredy exists`);
  }
};

export const emailValid = async (email = "") => {
  const emailValid = await User.findOne({ email });
  return !!emailValid;
};

export const existUser = async (name = "") => {
  const existUser = await User.findOne({ name });
  if (existUser) {
    throw new Error(`The user ${name} alredy exists`);
  }
};

export const existUserById = async (id = "") => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`The id ${id} doesnt exists`);
  }
};

export const existsCategoryById = async (id = "") => {
  const existsCategory = await Category.findById(id);
  if (!existsCategory) {
    throw new Error(`The id ${id} doesnt exists`);
  }
};

export const nameValid = async (name = "") => {
  const nameValid = await User.findOne({ name });
  return !!nameValid;
};

export const existProduct = async (id = "") => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`The product id ${id} does not exist`);
  }
};

export const existProductName = async (productName = "") => {
  const existProductN = await Product.findOne({ productName });
  if (existProductN) {
    throw new Error(`The product named ${productName} alredy exists`);
  }
};

export const existsCategoryName = async (categoryName = "") => {
  const existCategoryN = await Category.findOne({ categoryName });
  if (existCategoryN) {
    throw new Error(`The category named ${categoryName} alredy exists`);
  }
};

export const existBill = async (id = "") => {
  const existBill = await Bill.findById(id);
  if (!existBill) {
    throw new Error(`Bill id ${id} does not exist`);
  }
};
