import axios from "axios";
import { Request, Response } from "express";
import { config } from "../../config";
// import { checkHeader } from ".";

export const get = async (req: Request, res: Response) => {
  try {
    // const containsHeader = checkHeader(req);
    // if (!containsHeader) {
    //   res.status(401).json({ error: "Missing `key: 'meshjs.dev'` in header" });
    //   return;
    // }

    // Construct the full URL
    const url = `${config.yaciBaseUrl}${req.originalUrl}`;

    // Forward the request to the baseURL
    const response = await axios.get(url, {
      params: req.query,
    });

    // Send the response back to the client
    res.status(response.status);
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
