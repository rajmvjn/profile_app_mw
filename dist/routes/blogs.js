"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const router = (0, express_1.Router)();
router.post("/blogs", blogController_1.postBlogs);
router.get("/blogs", blogController_1.getBlogs);
exports.default = router;
