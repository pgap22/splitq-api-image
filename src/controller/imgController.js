import fs from 'fs/promises'; // Use promises for asynchronous operations
import { prisma } from "../db/prisma.js";

const url_images = "/public";
const imageMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/tiff',
  'image/svg+xml'
];

const uploadImg = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });
  
  if(!imageMimeTypes.includes(req.file.mimetype)) return res.status(400).json({ message: "Invalid file" });

  const nombre = req.file.originalname;
  const direccion = url_images + "/" + nombre;

  try {
    console.log("Creating image...");

    // Write the image file asynchronously using fs.writeFile
    await fs.writeFile("." + url_images + "/" + nombre, req.file.buffer);

    const uploadedImg = await prisma.imgs.create({ data: { url: direccion } });
    return res.status(200).json(uploadedImg);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error uploading image" }); // Specify error message
  }
};

const deleteImg = async (req, res) => {
  try {
    let { id } = req.params;

    const validacionImg = await prisma.imgs.findFirst({ where: { id } });
    if (!validacionImg) {
      return res.status(400).json({ message: "Image not found" });
    }

    const deleteImage = await prisma.imgs.findFirst({ where: { id } }); // Redundant line removed

    if (deleteImage) {
      console.log("Deleting image...");

      // Delete the image file asynchronously using fs.unlink
      await fs.unlink("." + deleteImage.url);
    }

    const imgDeleted = await prisma.imgs.delete({ where: { id } });
    return res.status(200).json(imgDeleted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting image" }); // Specify error message
  }
};

export { uploadImg, deleteImg };
