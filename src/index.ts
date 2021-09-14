import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { router } from "./router";

dotenv.config({ path: __dirname + '/../.env' });

createConnection().then(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/", router);

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`App is running in port ${port}`);
  });
})
  .catch((error) => console.log(error));
