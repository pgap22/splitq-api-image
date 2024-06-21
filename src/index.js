import express from "express";
import imgRoutes from "./routes/imgRoutes.js"
import { prisma } from "./db/prisma.js";

const app = express()

app.use(express.json())
app.use("/public/",express.static("public"))

app.get("/", async (req,res)=>{
    try {
        await prisma.$queryRaw`SELECT 1`;
        return res.json({ok: 1})
    } catch (error) {
        console.log(error)
        return res.json({error: 0})
    }
})

app.use("/image",imgRoutes)

app.listen(5000)