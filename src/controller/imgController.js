import fs from "fs"
import { prisma } from "../db/prisma.js"

const url_images = "/public/images"

const uploadImg = async(req,res) =>{

    const datos = req.body

    const nombre = req.file.originalname
    const direccion = url_images+"/"+nombre

    try {
        
        console.log("creando img")
        fs.writeFile("." + url_images+"/"+nombre, req.file.buffer, function(){
        })

        const uploadedImg = await prisma.imgs.create({data:{url:direccion}})
        return res.status(200).json(uploadedImg)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error")
    }
}

const deleteImg = async(req,res) =>{
    
    try {
            let {id} = req.params
        
            const validacionImg = await prisma.imgs.findFirst({where: {id: id}})
            if (!validacionImg) {
            return res.status(400).send("La imagen no existe")
            }
        
            const deleteImage = await prisma.imgs.findFirst({where: {id: id}})
        
            if (deleteImage) {
                fs.unlink("." + deleteImage.url, function(){
                })
            }
        
            const imgDeleted = await prisma.imgs.delete({where: {id: id}})
            return res.status(200).json(imgDeleted)
            
        } catch (error) {
            console.log(error)
            return res.status(400).send("Error de servidor")
        }
}

export {
    uploadImg,
    deleteImg
}