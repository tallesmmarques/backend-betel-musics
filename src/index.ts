import express from "express";
const app = express()

app.get("/", (_, res) => {
  res.send('Hello World')
})

const port = 3001

app.listen(port, () => {
  console.log(`App running in port ${port}`)
})
