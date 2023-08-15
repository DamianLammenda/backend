import { Router } from "express";
//import ProductManager from "../services/product/productManager.js";
import ProductModel from "../models/productsModels.mongo.js";

const router = Router();
// const productManager = new ProductManager(
//   "./src/services/product/products.json"
// );

// router.get("/", (_req, res) => {
//   try {
//     const products = productManager.getProducts();
//     res.render("home", { products });
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    const products = await ProductModel.paginate({}, { limit, page });
    const productsPlain = products.docs.map(product => ({ ...product }));
    console.log(productsPlain.title);
    res.render("home.handlebars", { productsPlain });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

export default router;
