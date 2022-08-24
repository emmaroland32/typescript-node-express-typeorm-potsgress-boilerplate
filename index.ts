import "reflect-metadata";

import { DBConnection } from "./src/config/database/dev.typeorm";
import compression from "compression";
import express from "express";
import routes from "./src/routes";

const app = express();

async function Server() {
  process.env.NODE_ENV === "production"
    ? require("custom-env").env("production")
    : require("custom-env").env("development");

  try {
    app.use(compression());
    await DBConnection();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.get("/", (req, res) => {
      res.send(
        "Welcome to the API request for BOOKVendor. Please procees to /api route to get started!"
      );
    });

    app.use("/api", routes);
  } catch (err) {
    console.log("Server Unavailable");
  }
  const port = process.env.APP_PORT ? process.env.APP_PORT : 6000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

Server();
