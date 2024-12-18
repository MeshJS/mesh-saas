import express from "express";
import { jsontoTxMiddleware } from "../middleware/usersJsonToTxValidation";
import { jsontoTxController } from "../controllers/usersJsonToTxController";

const jsonToTxrouter = express.Router();

/**
 * @swagger
 * /transaction/json-tx:
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
 *                // Define your request body schema here
 *         schema:
 *           type: integer
 *           example: 1
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
jsonToTxrouter.post(
  "/",
  jsontoTxMiddleware.validateParam,
  jsontoTxController.jsonToTx,
);

export default jsonToTxrouter;
