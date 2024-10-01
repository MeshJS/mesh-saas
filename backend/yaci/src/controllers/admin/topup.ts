import { Request, Response } from "express";
import axios from "axios";
import { config } from "../../config";
import { parseHttpError } from "../../libs/parser";
import { TopupRequest } from "../../models/admin.model";

export const topup = async (
  req: Request<any, any, TopupRequest>,
  res: Response
) => {
  console.log("Topup request received");

  try {
    const { wallet_address, ada_amount } = req.body;
    const url = `${config.yaciAdminUrl}/local-cluster/api/addresses/topup`;
    const data = { address: wallet_address, adaAmount: ada_amount };

    console.log(`Sending topup request to ${url}`);
    console.log(`Data: ${JSON.stringify(data)}`);

    const headers = { "Content-Type": "application/json" };
    const response = await axios.post(url, data, {
      headers,
    });

    // Send the response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res
      .status(error.response?.status || 500)
      .json({ error: parseHttpError(error) });
  }
};
