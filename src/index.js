import express from "express";
import imgRoutes from "./routes/imgRoutes.js"

const app = express()

app.use(express.json())

app.use("/image",imgRoutes)

app.listen(5000)