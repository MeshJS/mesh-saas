import { Request, Response } from "express";

import {
  generateNonce as _generateNonce,
  checkSignature as _checkSignature,
} from "@meshsdk/core";
import {
  SignatureCheckSignatureRequest,
  SignatureGenerateNonceRequest,
} from "@models/auth.model";

export const generateNonce = async (
  req: Request<any, any, SignatureGenerateNonceRequest>,
  res: Response
) => {
  let label = "I agree to the term and conditions";
  if (req.body.label) label = req.body.label;
  const nonce = _generateNonce(label);
  res.json({ success: true, data: nonce });
};

export const checkSignature = async (
  req: Request<any, any, SignatureCheckSignatureRequest>,
  res: Response
) => {
  const { nonce, signature } = req.body;
  const valid = _checkSignature(nonce, signature);
  res.json({ success: true, data: valid });
};
