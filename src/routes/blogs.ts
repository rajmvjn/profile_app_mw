import { Router } from "express";
import { body } from "express-validator";

import { postBlogs, getBlogs } from "../controllers/blogController";

const router = Router();

router.post("/blogs", postBlogs);
router.get("/blogs", getBlogs);

export default router;
