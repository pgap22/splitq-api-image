import { Router } from "express";
import multer from "multer";
import { deleteImg, uploadImg } from "../controller/imgController.js";


const router = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("img"), uploadImg )
router.delete("/:id", deleteImg)

export default router