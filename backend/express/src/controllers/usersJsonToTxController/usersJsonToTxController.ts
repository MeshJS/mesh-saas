import { Request, Response } from "express";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";
import dotenv from "dotenv";

dotenv.config();

export const jsonToTx = async (req: Request, res: Response) => {
  const meshTxBody = req.body;
  const network = meshTxBody.network;

  let apiKey;
  if (network === "preprod") {
    apiKey = process.env.BLOCKFROST_API_KEY_PREPROD!;
  } else if (network === "mainnet") {
    apiKey = process.env.BLOCKFROST_API_KEY_MAINNET!;
  } else {
    return res
      .status(400)
      .json({ error: "network specified in the JSON is not supported" });
  }

  const blockchainProvider = new BlockfrostProvider(apiKey!);

  const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider,
    evaluator: blockchainProvider,
  });

  try {
    const unsignedTx = await txBuilder.completeSync(meshTxBody);
    return res.json({ unsignedTx });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
