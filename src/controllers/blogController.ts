import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { unlink } from "node:fs";

import Blog from "../models/blog";
import throwError from "../utils/throwError";

/*
image processing..
*/
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/blog");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    // cb(null, `blog-${Date.now()}.${ext}`);
    cb(null, `blog_${uuidv4()}.${ext}`);
  },
});

const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("please upload image"), false);
  }
};

export const uploadBlogPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).array("photos", 10);

/*
Blog processing..
*/
export const postBlogs: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError(next, null, "Validation failed, entered data is incorrect.");
  }

  const blogData = JSON.parse(req.body.blog);
  let photoArray = req.files ? (req.files as Express.Multer.File[]) : [];

  let photoIndex = 0;

  blogData.blogs.fieldTypes.forEach((element: string, index: number) => {
    if (element === "photo") {
      blogData.blogs.fieldValues[index] = photoArray[photoIndex].filename;
      photoIndex++;
    }
  });

  const blog = new Blog({
    userId: blogData.userId,
    blogs: {
      fieldTypes: blogData.blogs.fieldTypes,
      fieldValues: blogData.blogs.fieldValues,
    },
  });

  try {
    const result = await blog.save();
    blog._id = result._id;
    res.status(200).json(blog);
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

export const updateBlog: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError(next, null, "Validation failed, entered data is incorrect.");
  }

  const { id } = req.params;
  const blogs = req.body;

  try {
    const result = await Blog.findByIdAndUpdate(id, { blogs }, { new: true });
    res
      .status(200)
      .json({ message: "Blog updated successfully", _id: result._id });
  } catch (error) {
    throwError(next, error);
  }
};

export const deleteBlog: RequestHandler = async (req, res, next) => {
  const blog = req.body.blog;

  try {
    await Blog.findByIdAndDelete(req.params.id);

    blog.fieldTypes.forEach((fType: string, index: number) => {
      if (fType === "photo") {
        unlink(`public/img/blog/${blog.fieldValues[index]}`, (err) => {
          if (err) throwError(next, err);
          // console.log("path/file.txt was deleted");
        });
      }
    });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    throwError(next, error);
  }
};
