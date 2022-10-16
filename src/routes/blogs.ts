import { Router } from "express";
// import { body } from "express-validator";

import {
  postBlogs,
  getBlogs,
  deleteBlog,
  updateBlog,
  uploadBlogPhoto,
} from "../controllers/blogController";

const router = Router();

router.post("/blogs", uploadBlogPhoto, postBlogs);
router.get("/blogs", getBlogs);
router.delete("/blogs/:id", deleteBlog);
router.patch("/blogs/:id", updateBlog);
export default router;
