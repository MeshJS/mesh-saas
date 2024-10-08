import express from "express";
import { jsontoTxmiddleware } from "../middleware/users.jsontoTx.validation";
import { jsontoTxcontroller } from "../controllers/users.jsontoTx.controller";

const jsontoTxrouter = express.Router();

/**
 * @swagger
 * /users/jsontoTx:
 *   post:
 *     summary: Convert JSON to Unsigned Transaction for Cardano Blockchain
 *     description: Converts a JSON file to a transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your request body schema here
 *     responses:
 *       200:
 *         description: Successfully converted JSON to transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unsignedTx:
 *                   type: string
 *       400:
 *         description: Bad request
 */
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
