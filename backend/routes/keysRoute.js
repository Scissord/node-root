import express from "express";
import * as controller from '../controllers/keysController.js';

const router = express.Router();

router.patch("/update", controller.updateText);

export default router;