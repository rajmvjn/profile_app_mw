import { validationResult } from "express-validator";
import { RequestHandler } from "express";

import Comment from "../models/comment";
import User from "../models/user";
import throwError from "../utils/throwError";

//connect comments..
export const getComments: RequestHandler = async (req, res, next) => {
  let comments;

  try {
    comments = await Comment.findOne({ email: "raj@test.com" });
    res.status(200).json({ comments: comments });
  } catch (error) {
    throwError(next, error);
  }
};

export const postComments: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError(next, null, "Validation failed, entered data is incorrect.");
  }

  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    comment: req.body.comment,
  });

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: "req.body.password",
  });

  try {
    const userData = await user.save();
    console.log(userData);
    const result = await comment.save();
    res
      .status(200)
      .json({ message: "Comment saved successfully", _id: result._id });
  } catch (error) {
    throwError(next, error);
  }
};

export const loginController: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError(next, null, "Please check your entered data.", 401);
  }

  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      res.status(200).json({ message: "User Authenticated", user: result });
    } else {
      throwError(next, null, "Invalid username or password", 401);
    }
  } catch (error) {
    throwError(next, error);
  }
};
