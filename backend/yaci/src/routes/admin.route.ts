import express from "express";
import { adminController } from "../controllers";
import { admin } from "../middleware";

const router = express.Router();

router.post("/topup", admin.topup.validateParam, adminController.topup);
router.get("/genesis", adminController.genesis);

export default router;
