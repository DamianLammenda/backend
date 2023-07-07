import express from "express";
import morgan from "morgan";
import productRouter from "./src/router/products.routes.js";
import cartRouter from "./src/router/cart.routes.js";


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/views"));
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);



export default app;
