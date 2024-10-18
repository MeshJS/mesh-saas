import * as meshSdkCore from "@meshsdk/core";
import { Request, Response } from "express";

export const resolvePrivateKey = async (req: Request, res: Response) => {
  const mnemonicPhrases: Array<string> = req.body;
  try {
    const privateKey = meshSdkCore.resolvePrivateKey(mnemonicPhrases);
    return res.json(privateKey);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveDataHash = async (req: Request, res: Response) => {
  const datum = req.params.datum;
  try {
    const dataHash = meshSdkCore.resolveDataHash(datum);
    return res.json(dataHash);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveNativeScriptHash = async (req: Request, res: Response) => {
  const { address, nativeScript } = req.body;

  try {
    const keyHash = meshSdkCore.resolvePaymentKeyHash(address);

    const updatedNativeScript: meshSdkCore.NativeScript = {
      ...nativeScript,
      scripts: nativeScript.scripts.map((script) =>
        script.type === "sig" ? { ...script, keyHash } : script,
      ),
    };

    const resolvedNativeScript =
      meshSdkCore.resolveNativeScriptHash(updatedNativeScript);

    return res.json(resolvedNativeScript);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveScriptHash = async (req: Request, res: Response) => {
  const scriptAddress = req.params.scriptaddress;
  try {
    const scriptHash = meshSdkCore.resolveScriptHash(scriptAddress);
    return res.json(scriptHash);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveStakeAddress = async (req: Request, res: Response) => {
  const walletAddress = req.params.walletaddress;
  try {
    const stakeAddress = meshSdkCore.resolveRewardAddress(walletAddress);
    return res.json(stakeAddress);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveFingerprint = async (req: Request, res: Response) => {
  const { policyId, assetName } = req.body;
  try {
    const fingerprint = meshSdkCore.resolveFingerprint(policyId, assetName);
    return res.json(fingerprint);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveStakeKeyHash = async (req: Request, res: Response) => {
  const stakeAddress = req.params.stakeaddress;
  try {
    const stakePubKeyHash = meshSdkCore.resolveStakeKeyHash(stakeAddress);
    return res.json(stakePubKeyHash);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveRepId = async (req: Request, res: Response) => {
  const scriptHash = req.params.scripthash;
  try {
    const repId = meshSdkCore.resolveScriptHashDRepId(scriptHash);
    return res.json(repId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveEpochNumber = async (req: Request, res: Response) => {
  const network = req.params.network as "testnet" | "preview" | "preprod" | "mainnet";
  try {
    const epochNumber = meshSdkCore.resolveEpochNo(network);
    return res.json(epochNumber);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const resolveSlotNumber = async (req: Request, res: Response) => {
  const network = req.params.network as "testnet" | "preview" | "preprod" | "mainnet";
  try {
    const slotNumber = meshSdkCore.resolveSlotNo(network);
    return res.json(slotNumber);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
