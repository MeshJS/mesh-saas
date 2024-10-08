import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jsontoTxRouter from "./routes/users.jsontoTx.route";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
const swaggerSpec = require("../swaggerConfig");

dotenv.config(); // Load environment variables

console.log("Starting application...");

const app = express();
app.use(bodyParser.json());
app.use(cors());

console.log("Setting up routes...");

app.use("/users/jsontoTx", jsontoTxRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({ error: err.message });
});

// Start the server
const port = parseInt(process.env.PORT || "3001");
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
