import Bill from "../bills/bill.model.js";
import Product from "./product.model.js";

export const getProduct = async (req, res = response) => {
  const { limit, from } = req.query;
  const query = { status: true };

  const [total, product] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    product,
  });
};

export const postProduct = async (req, res) => {
  const { productName, description, price, ...rest } = req.body;
  try {
    const newProduct = new Product({
      productName,
      description,
      price,
    });

    Object.assign(newProduct, rest);
    await newProduct.save();
    res.status(201).json({
      msg: "The product was created succesfully",
      product: newProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const modifyProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { ...rest } = req.body;

  try {
    let update = {};
    if (rest.nameProduct) update.nameProduct = rest.nameProduct;
    if (rest.description) update.description = rest.description;
    if (rest.stock) update.stock = rest.stock;
    if (rest.price) update.price = rest.price;
    if (rest.category) update.category = rest.category;
    update.update_at = new Date();

    const updateUser = await Product.findByIdAndUpdate(productId, update, {
      new: true,
    });

    res.status(200).json({
      msg: "Product updated succesfully",
      user: updateUser,
    });
  } catch (e) {
    console.log(e);
    RTCRtpSender.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const existProduct = await Product.findById(productId);
    existProduct.status = false;
    await existProduct.save();
    res.status(200).json({
      msg: "Product deleted succesffully",
    });
  } catch (e) {
    console.log(e);
    res.statsu(500).json({
      msg: "Error in the server",
    });
  }
};

export const outOfStock = async (req, res) => {
  try {
    const outOfStockP = await Product.find({ stock: 0, status: true });
    res.status(200).json({
      outOfStockP,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error in the server",
    });
  }
};

export const bestSeller = async (req, res) => {
  try {
    const bills = await Bill.find();
    const productCounts = new Map();

    bills.forEach((bill) => {
      bill.products.forEach((product) => {
        const productId = product.productId;
        const quantity = product.quantity;

        if (productCounts.has(productId)) {
          productCounts.set(productId, productCounts.get(productId) + quantity);
        } else {
          productCounts.set(productId, quantity);
        }
      });
    });
    const sortedProducts = [...productCounts.entries()].sort(
      (a, b) => b[1] - a[1]
    );
    res.status(200).json({ bestSellingProducts: sortedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const searchProductsByName = async (req, res) => {
  const { productName } = req.query;

  try {
    const products = await Product.find({
      productName: { $regex: productName, $options: "i" },
    });
    if (products.length === 0) {
      return res.status(404).json({ msg: "No products found with that name" });
    }
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
