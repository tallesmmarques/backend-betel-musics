import "reflect-metadata";
import * as express from "express"
import * as cors from "cors";
import { createConnection } from "typeorm"
import { router } from "./router"

createConnection().then(async () => {

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.use("/", router)

  const port = 8080
  app.listen(port, () => {
    console.log(`App is running in port ${port}`);

  })

}).catch(error => console.log(error));
