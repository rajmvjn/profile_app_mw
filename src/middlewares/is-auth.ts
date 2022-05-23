import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import throwError from "../utils/throwError";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any = req.get("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    throwError(next, null, "Not authenticated.", 401);
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    throwError(next, null, "Server Error: JWT", 500);
  }
  if (!decodedToken) {
    throwError(next, null, "Not authenticated.", 401);
  }

  next();
};
