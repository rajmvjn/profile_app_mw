import { Router } from "express";
import { body } from "express-validator";

import { postBlogs, getBlogs, deleteBlog } from "../controllers/blogController";

const router = Router();

router.post("/blogs", postBlogs);
router.get("/blogs", getBlogs);
router.delete("/blogs/:id", deleteBlog);

export default router;
