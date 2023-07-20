import express from "express";
import morgan from "morgan";
import productRouter from "./src/router/products.routes.js";
import cartRouter from "./src/router/cart.routes.js";
import viewRouter from "./src/router/views.routes.js";
import realTimeProducts from "./src/router/realTimeProducts.routes.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";



const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(express.static("./public"));
app.set("views", `${__dirname}/views`)
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/realtimeproducts", realTimeProducts);
app.use("/", viewRouter);


export default app;
