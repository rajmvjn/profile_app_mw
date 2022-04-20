import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRoutes from "./routes/user";

const app = express();

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
  .connect(
    "mongodb+srv://rajeshvijayan:rajeshVijayan@cluster0.abgtw.mongodb.net/profileApp?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => console.log(err));
