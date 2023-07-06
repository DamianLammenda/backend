import express from "express";
import morgan from "morgan";
import router from "./src/router/routes.js";


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/views"));
app.use("/api", router);



export default app;
