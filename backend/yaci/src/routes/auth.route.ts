import express from "express";
import { authSignatureController } from "../controllers";

const router = express.Router();

router.post("/nonce", authSignatureController.generateNonce);
router.post("/verify", authSignatureController.checkSignature);

export default router;
