import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mainRoutes from "./Routes";

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.use(mainRoutes);


server.listen(process.env.PORT);
