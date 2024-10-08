import express from "express";
import { jsontoTxmiddleware } from "../middleware/users.jsontoTx.validation";
import { jsontoTxcontroller } from "../controllers/users.jsontoTx.controller";

const jsontoTxrouter = express.Router();

jsontoTxrouter.post(
  "/",
  jsontoTxmiddleware.validateParam,
  jsontoTxcontroller.jsontoTx,
);

// jsontoTxrouter.post(
//   "/submit",
//   submitTx.validateParam,
//   exampleTxController.submitTx,
// );

export default jsontoTxrouter;
