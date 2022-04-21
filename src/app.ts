import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import morgan from "morgan";
import userRoutes from "./routes/user";

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Middlewares
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(compression()); // Compress all routes
app.use(morgan("combined", { stream: accessLogStream })); // Logging
app.use(bodyParser.json());

// enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", userRoutes);

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => console.log(err));
