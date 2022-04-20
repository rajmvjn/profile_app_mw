import { Router } from "express";
import { body } from "express-validator";

import { getComments, postComments } from "../controllers/userController";

const router = Router();

router.get("/comment", getComments);

router.post(
  "/comment",
  [body("name").trim().isLength({ min: 1 })],
  postComments
);

export default router;
