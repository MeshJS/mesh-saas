import { DataSignature } from "@meshsdk/core";

export type SignatureGenerateNonceRequest = {
  label: string;
};

export type SignatureCheckSignatureRequest = {
  nonce: string;
  signature: DataSignature;
};
