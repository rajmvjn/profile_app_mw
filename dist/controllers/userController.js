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
exports.loginController = exports.postComments = exports.getComments = void 0;
const express_validator_1 = require("express-validator");
const comment_1 = __importDefault(require("../models/comment"));
const user_1 = __importDefault(require("../models/user"));
const throwError_1 = __importDefault(require("../utils/throwError"));
//connect comments..
const getComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let comments;
    try {
        comments = yield comment_1.default.findOne({ email: "raj@test.com" });
        res.status(200).json({ comments: comments });
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.getComments = getComments;
const postComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwError_1.default)(next, null, "Validation failed, entered data is incorrect.");
    }
    const comment = new comment_1.default({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        comment: req.body.comment,
    });
    const user = new user_1.default({
        name: req.body.name,
        email: req.body.email,
        password: "req.body.password",
    });
    try {
        const userData = yield user.save();
        console.log(userData);
        const result = yield comment.save();
        res
            .status(200)
            .json({ message: "Comment saved successfully", _id: result._id });
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.postComments = postComments;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, throwError_1.default)(next, null, "Please check your entered data.", 401);
    }
    try {
        const result = yield user_1.default.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (result) {
            res.status(200).json({ message: "User Authenticated", user: result });
        }
        else {
            (0, throwError_1.default)(next, null, "Invalid username or password", 401);
        }
    }
    catch (error) {
        (0, throwError_1.default)(next, error);
    }
});
exports.loginController = loginController;
