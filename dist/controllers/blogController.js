"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogs = exports.postBlogs = exports.uploadBlogPhoto = void 0;
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const node_fs_1 = require("node:fs");
const blog_1 = __importDefault(require("../models/blog"));
const throwError_1 = __importDefault(require("../utils/throwError"));
/*
image processing..
*/
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/blog");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        // cb(null, `blog-${Date.now()}.${ext}`);
        cb(null, `blog_${(0, uuid_1.v4)()}.${ext}`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new Error("please upload image"), false);
    }
};
exports.uploadBlogPhoto = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
}).array("photos", 10);
/*
Blog processing..
*/
const postBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwError_1.default)(next, null, "Validation failed, entered data is incorrect.");
    }
    const blogData = JSON.parse(req.body.blog);
    let photoArray = req.files ? req.files : [];
    let photoIndex = 0;
    blogData.blogs.fieldTypes.forEach((element, index) => {
        if (element === "photo") {
            blogData.blogs.fieldValues[index] = photoArray[photoIndex].filename;
            photoIndex++;
        }
    });
    const blog = new blog_1.default({
        userId: blogData.userId,
        blogs: {
            fieldTypes: blogData.blogs.fieldTypes,
            fieldValues: blogData.blogs.fieldValues,
        },
    });
    try {
        const result = yield blog.save();
        blog._id = result._id;
        res.status(200).json(blog);
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.postBlogs = postBlogs;
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let blogs;
    try {
        blogs = yield blog_1.default.find();
        res.status(200).json({ blogs: blogs });
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.getBlogs = getBlogs;
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwError_1.default)(next, null, "Validation failed, entered data is incorrect.");
    }
    const { id } = req.params;
    const blogs = req.body;
    try {
        const result = yield blog_1.default.findByIdAndUpdate(id, { blogs }, { new: true });
        res
            .status(200)
            .json({ message: "Blog updated successfully", _id: result._id });
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = req.body.blog;
    try {
        yield blog_1.default.findByIdAndDelete(req.params.id);
        blog.fieldTypes.forEach((fType, index) => {
            if (fType === "photo") {
                (0, node_fs_1.unlink)(`public/img/blog/${blog.fieldValues[index]}`, (err) => {
                    if (err)
                        (0, throwError_1.default)(next, err);
                    // console.log("path/file.txt was deleted");
                });
            }
        });
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.deleteBlog = deleteBlog;
