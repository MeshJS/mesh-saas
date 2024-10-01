import { Request, Response } from "express";
import axios from "axios";
import { config } from "../../config";
import { parseHttpError } from "../../libs/parser";
// import { checkHeader } from ".";

export const post = async (req: Request, res: Response) => {
  try {
    // const containsHeader = checkHeader(req);
    // if (!containsHeader) {
    //   res.status(401).json({ error: "Missing `key: 'meshjs.dev'` in header" });
    //   return;
    // }

    // Construct the full URL
    const url = `${config.yaciBaseUrl}${req.originalUrl}`;
    console.log("req.originalUrl", req.originalUrl);

    // Forward the request to the baseURL
    const headers = { "Content-Type": "application/cbor" };

    if (req.originalUrl === "/api/v1/tx/submit") {
      headers["Content-Type"] = "text/plain";
    }

    const response = await axios.post(url, req.body, {
      headers,
    });

    // Send the response back to the client
    res.status(response.status);
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res
      .status(error.response?.status || 500)
      .json({ error: parseHttpError(error) });
  }
};
