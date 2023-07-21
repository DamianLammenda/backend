import { Router } from "express";
import ProductManager from "../services/product/productManager.js";

const router = Router();
const productManager = new ProductManager(
  "./src/services/product/products.json"
);

router.get("/", (_req, res) => {
  try {
    const products = productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const product = req.body;
    productManager.addProduct(product);
    console.log("Producto agregado:", product);
    res.redirect("/realTimeProducts");

  } catch (error) {
    res.status(500).send({success: false, error: error.message});
  }
});

export default router;
