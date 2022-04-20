import { validationResult } from "express-validator";
import { RequestHandler } from "express";

import Comment from "../models/comment";
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

export const postComments: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    // error.statusCode = 422;
    // error.data = errors.array();
    next(error);
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
