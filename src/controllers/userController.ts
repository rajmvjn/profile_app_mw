import { validationResult } from "express-validator";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import Comment from "../models/comment";
import User from "../models/user";
import throwError from "../utils/throwError";

//connect comments..
export const getComments: RequestHandler = async (req, res, next) => {
  let comments;

  try {
    comments = await Comment.find();
    res.status(200).json({ comments: comments });
  } catch (error) {
    throwError(next, error);
  }
};

export const deleteComment: RequestHandler = async (req, res, next) => {
  let id = req.params.id;
  try {
    let response = await Comment.findByIdAndDelete(id);
    if (response) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      throwError(next, null, "Comment not found", 404);
    }
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

  try {
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
      const token = jwt.sign({ email: result.email }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });
      console.log(token);
      res
        .status(200)
        .json({ token: token, message: "User Authenticated", user: result });
    } else {
      throwError(next, null, "Invalid username or password", 401);
    }
  } catch (error) {
    throwError(next, error);
  }
};
