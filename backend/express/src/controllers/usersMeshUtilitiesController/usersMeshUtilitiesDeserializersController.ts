import { Request, Response } from "express";
import * as meshSdkCore from "@meshsdk/core";

export const deserializeAddress = async (req: Request, res: Response) => {
  const address = req.params.address;
  try {
    const deserializedAddress = meshSdkCore.deserializeAddress(address);
    return res.json(deserializedAddress)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deserializeDatum = async (req: Request, res: Response) => {
  const cbor = req.params.cbor;
  try {
    const deserializedDatum = meshSdkCore.deserializeDatum(cbor);
    return res.json(deserializedDatum);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deserializePoolId = async (req: Request, res: Response) => {
  const poolId = req.params.poolId;
  try {
    const deserializedPoolId = meshSdkCore.deserializePoolId(poolId);
    return res.json(deserializedPoolId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
