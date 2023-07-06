import express from "express";
import ProductManager from "../productManager.js";

const productManager = new ProductManager("./src/products.json");

const router = express.Router();

router.get("/products", (req, res) => {
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
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.get("/products/:pid", (req, res) => {
    try {
      const { pid } = req.params;
      const product = productManager.getProductById(pid);
  
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.post("/products", (req, res) => {
    try {
      const product = req.body;
      const newProduct = productManager.addProduct(product);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.put("/products/:pid", (req, res) => {
    try {
      const { pid } = req.params;
      const updatedProduct = req.body;
      const product = productManager.updateProduct(pid, updatedProduct);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  router.delete("/products/:pid", (req, res) => {
    try {
      const { pid } = req.params;
      productManager.deleteProduct(pid);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

    export default router;