import { Request, Response } from "express";
import axios from "axios";
import { config } from "../../config";
import { parseHttpError } from "../../libs/parser";

export const genesis = async (_req: Request, res: Response) => {
  console.log("Topup request received");

  try {
    const url = `${config.yaciAdminUrl}/local-cluster/api/admin/devnet/genesis/shelley`;

    console.log(`Sending topup request to ${url}`);

    const response = await axios.get(url);

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res
      .status(error.response?.status || 500)
      .json({ error: parseHttpError(error) });
  }
};
