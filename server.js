import app from "./app.js";
import { config } from "dotenv";
config();
import { Server } from "socket.io";
import mongoConnect from "./src/Config/mongo.config.js";

const PORT = process.env.PORT || 8080;

mongoConnect();

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const io = new Server(httpServer);
