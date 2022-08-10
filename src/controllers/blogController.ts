import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import Blog from "../models/blog";
import throwError from "../utils/throwError";

export const postBlogs: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError(next, null, "Validation failed, entered data is incorrect.");
  }

  console.log(req.body);

  const blog = new Blog({
    userId: req.body.userId,
    blogs: {
      fieldTypes: req.body.blogs.fieldTypes,
      fieldValues: req.body.blogs.fieldValues,
    },
  });

  try {
    const result = await blog.save();
    res
      .status(200)
      .json({ message: "Blog saved successfully", _id: result._id });
  } catch (error) {
    throwError(next, error);
  }
};

export const getBlogs: RequestHandler = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find();
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    throwError(next, error);
  }
};

export const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    throwError(next, error);
  }
};
