import { Router } from "express";
import { body } from "express-validator";
import isAuth from "../middlewares/is-auth";

import {
  getComments,
  postComments,
  deleteComment,
  loginController,
} from "../controllers/userController";

const router = Router();

//User comments section...

router.get("/comment", getComments);

router.post(
  "/comment",
  // isAuth, //middleware for checking token, not using here as its a public route
  [body("name").trim().isLength({ min: 3 })],
  postComments
);

router.delete("/comment/:id", isAuth, deleteComment);

//User comments section ends...

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
