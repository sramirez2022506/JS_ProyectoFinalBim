import { config } from "dotenv";
config();
import Server from "./config/server.js";

const Server = new Server();

Server.listen();