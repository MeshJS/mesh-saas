import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import providerRouter from "./routes/provider.route";
import adminRouter from "./routes/admin.route";
import authRouter from "./routes/auth.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use("/api/v1", bodyParser.text({ type: "*/*" }), providerRouter);
app.use("/admin", bodyParser.json(), adminRouter);
app.use("/auth", bodyParser.json(), authRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({ error: err.message });
});

// Start the server
const port = parseInt(process.env.PORT || "8080");
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
