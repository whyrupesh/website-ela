import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for adding a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
      stockQty: 0, // Default stock quantity is 0 when adding a new product
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for listing all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for getting single product information
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// New function to update the stock quantity of a product
const updateStock = async (req, res) => {
  const { id, stockQty } = req.body;

  if (!id || stockQty === undefined) {
    return res.status(400).json({ success: false, message: "Product ID and stock quantity are required." });
  }

  try {
    // Find the product and update the stock quantity
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    product.stockQty = stockQty; // Update the stock quantity
    await product.save();

    res.status(200).json({ success: true, message: "Stock updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// New function to reduce the stock when an order is successful
const reduceStock = async (orderItems) => {
  try {
    // Loop through each item in the order
    console.log("Reducing stock for order items: ", orderItems);
    for (let item of orderItems) {
      const productId = item._id; 
      const quantity = item.quantity;
      if (!productId || !quantity) {
        throw new Error("Product ID and quantity are required.");
      }
      
      // Find the product and reduce stock quantity
      const product = await productModel.findById(productId);
      if (product) {
        if (product.stockQty >= quantity) {
          product.stockQty -= quantity; // Reduce the stock quantity
          await product.save();
        } else {
          throw new Error(`Not enough stock for ${product.name}`);
        }
      } else {
        throw new Error("Product not found");
      }
    }
  } catch (error) {
    console.log("Error reducing stock: ", error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { listProducts, addProduct, removeProduct, singleProduct, updateStock, reduceStock };
