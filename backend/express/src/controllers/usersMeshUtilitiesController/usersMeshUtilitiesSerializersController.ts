import { Request, Response } from "express";
import * as meshSdkCore from "@meshsdk/core";

export const serializeNativeScript = async (req: Request, res: Response) => {
  const { address, nativeScript } = req.body;

  try {
    const { pubKeyHash: keyHash } = meshSdkCore.deserializeAddress(address);

    const updatedNativeScript: meshSdkCore.NativeScript = {
      ...nativeScript,
      scripts: nativeScript.scripts.map((script) =>
        script.type === "sig" ? { ...script, keyHash } : script,
      ),
    };

    const serializedNativeScript =
      meshSdkCore.serializeNativeScript(updatedNativeScript);

    return res.json(serializedNativeScript);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const serializePlutusScript = async (req: Request, res: Response) => {
  const script: meshSdkCore.PlutusScript = req.body;

  try {
    const serializedPlutusScript = meshSdkCore.serializePlutusScript(script);
    return res.json(serializedPlutusScript);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const serializeAddressObject = async (req: Request, res: Response) => {
  const { PubKeyHash, StakeCredential } = req.body;

  const address = meshSdkCore.scriptAddress(PubKeyHash, StakeCredential);

  try {
    const serializedAddressObject = meshSdkCore.serializeAddressObj(address);
    return res.json(serializedAddressObject);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const serializePoolId = async (req: Request, res: Response) => {
  const PubKeyHash = req.params.pubkeyhash;

  try {
    const poolId = meshSdkCore.serializePoolId(PubKeyHash);
    return res.json(poolId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const serializeRewardAddress = async (req: Request, res: Response) => {
  const { ScriptHashOrKeyHash, Is_Script_Hash, Network } = req.body;

  try {
    const rewardAddress = meshSdkCore.serializeRewardAddress(
      ScriptHashOrKeyHash,
      Is_Script_Hash,
      Network,
    );
    return res.json(rewardAddress);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
