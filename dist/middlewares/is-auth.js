"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const throwError_1 = __importDefault(require("../utils/throwError"));
exports.default = (req, res, next) => {
    const authHeader = req.get("Authorization");
    console.log(authHeader);
    if (!authHeader) {
        (0, throwError_1.default)(next, null, "Not authenticated.", 401);
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        (0, throwError_1.default)(next, null, "Server Error: JWT", 500);
    }
    if (!decodedToken) {
        (0, throwError_1.default)(next, null, "Not authenticated.", 401);
    }
    next();
};
