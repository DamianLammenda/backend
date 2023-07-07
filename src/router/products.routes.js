import express from "express";
import ProductManager from "../services/product/productManager.js";

const productManager = new ProductManager("./src/services/product/products.json");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { limit } = req.query;
    const products = productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      if (limitedProducts.length === 0) {
        return res.status(404).json({ error: "No se encontraron productos" });
      }
      return res.status(200).json(limitedProducts);
    }

    res.status(200).json({success: true, products});
  } catch (error) {
    res.status(500).send({success: false, error: error.message});
  }
});

router.get("/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const product = productManager.getProductById(pid);

    if (product) {
      const productWithoutId = { ...product };
      delete productWithoutId.id;
      res.status(200).json({success: true, productWithoutId});
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).send({success: false, error: error.message});
  }
});

router.post("/", (req, res) => {
  try {
    const product = req.body;
    productManager.addProduct(product);
    res.status(201).json({ success: true, message: "Producto agregado", product });
  } catch (error) {
    res.status(500).send({success: false, error: error.message});
  }
});

router.put("/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = req.body;
    const product = productManager.updateProduct(pid, updatedProduct);
    const productWithoutId = { ...product };
    delete productWithoutId.id;
    res.status(200).json({ success: true, productWithoutId});
  } catch (error) {
    res.status(500).send({success: false, error: error.message});
  }
});

router.delete("/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    productManager.deleteProduct(pid);
    res.status(204).json({ success: true, message: "Producto eliminado" });
  } catch (error) {
    res.status(404).json({ success: false, error: "Producto no encontrado" });
  }
});


export default router;
