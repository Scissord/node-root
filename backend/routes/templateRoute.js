import express from "express";
import * as controller from '../controllers/templateController.js';
import multer from "multer";
import getMulterStorage from "../helpers/getMulterStorage.js";

const storage = getMulterStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.array('files'), controller.uploadImage);

router.get("/get", controller.get);

router.post("/create", controller.create);

router.delete('/delete', controller.deleteProject);

router.post('/download', controller.download);

export default router;