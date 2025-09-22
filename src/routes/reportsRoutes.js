import express from "express";
import { reportsController } from "../controllers/reportsController.js";

const router = express.Router();

router.get("/", reportsController.getAll);

export default router;