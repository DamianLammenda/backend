import app from "./app.js";
import { config } from "dotenv";
config();
import { Server } from "socket.io";


const PORT = process.env.PORT || 8080;



const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const io = new Server(httpServer);
