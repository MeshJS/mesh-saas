import express from "express";
import { providerController } from "../controllers";

const router = express.Router();

router.get("/*", providerController.get);
router.post("/*", providerController.post);

export default router;
