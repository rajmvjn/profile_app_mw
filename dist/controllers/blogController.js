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
exports.deleteBlog = exports.updateBlog = exports.getBlogs = exports.postBlogs = void 0;
const express_validator_1 = require("express-validator");
const blog_1 = __importDefault(require("../models/blog"));
const throwError_1 = __importDefault(require("../utils/throwError"));
const postBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwError_1.default)(next, null, "Validation failed, entered data is incorrect.");
    }
    const blog = new blog_1.default({
        userId: req.body.userId,
        blogs: {
            fieldTypes: req.body.blogs.fieldTypes,
            fieldValues: req.body.blogs.fieldValues,
        },
    });
    try {
        const result = yield blog.save();
        res
            .status(200)
            .json({ message: "Blog saved successfully", _id: result._id });
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
    try {
        yield blog_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.deleteBlog = deleteBlog;
