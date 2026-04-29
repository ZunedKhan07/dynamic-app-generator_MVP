import { Router } from "express";
import { createData, getData, updateData } from "../controllers/data.Controller.js";

const router = Router();

// dynamic routes (IMPORTANT)
router.post("/data/:entity", createData);
router.get("/data/:entity", getData);
router.put("/data/:id", updateData);

export default router;