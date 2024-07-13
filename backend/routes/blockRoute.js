import express from "express";
import * as controller from '../controllers/blockController.js';

const router = express.Router();

router.get("/:html_id", controller.find);

export default router;