import { Router } from "express";
import { body } from "express-validator";

import {
  getComments,
  postComments,
  loginController,
} from "../controllers/userController";

const router = Router();

router.get("/comment", getComments);

router.post(
  "/comment",
  [body("name").trim().isLength({ min: 3 })],
  postComments
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 chars long"),
  ],
  loginController
);

export default router;
