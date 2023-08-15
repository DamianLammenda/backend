import express from "express";
import ProductModel from "../models/productsModels.mongo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const products = await ProductModel.paginate({}, { limit, page });
    res.render("home", { products });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid);
    res.status(200).send({
      success: true,
      data: product,
      message: product ? "Product found" : "Product not found",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const product = await newProduct.save();
    res
      .status(201)
      .send({ success: true, data: product, message: "Product created" });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  const productUpdated = await ProductModel.findByIdAndUpdate(
    req.params.pid,
    req.body,
    { new: false }
  );
  res.json(productUpdated);
});

router.delete("/:pid", async (req, res) => {
  try {
    const productRemoved = await ProductModel.findByIdAndDelete(req.params.pid);
    res.json(productRemoved);
  } catch (error) {
    res.status(404).json({ success: false, error: "Producto no encontrado" });
  }
});

export default router;
