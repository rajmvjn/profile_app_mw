import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user";
import blogRoutes from "./routes/blogs";

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Middlewares
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(compression()); // Compress all routes
app.use(morgan("combined", { stream: accessLogStream })); // Logging
app.use(cors());
app.use(bodyParser.json());

// enable CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH ,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// server public content
app.use(express.static(`public`));

app.use("/user", userRoutes);
app.use("/api/v1", blogRoutes);

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message });
});

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => console.log(err));
