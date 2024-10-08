import { Request, Response } from "express";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";
import dotenv from "dotenv";

dotenv.config();

// const projectID = process.env.BLOCKFROST_PROJECT_ID!;

const blockchainProvider = new BlockfrostProvider(
  process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD!,
);

const txBuilder = new MeshTxBuilder({
  fetcher: blockchainProvider,
  evaluator: blockchainProvider,
});

export const jsontoTx = async (req: Request, res: Response) => {
  const meshTxBody = req.body;

  try {
    const unsignedTx = await txBuilder.completeSync(meshTxBody);
    return res.json({ unsignedTx });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
