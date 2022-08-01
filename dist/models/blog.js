"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    blogs: {
        fieldTypes: [],
        fieldValues: [],
    },
    comments: [
        {
            userId: String,
            comment: String,
        },
    ],
});
exports.default = mongoose_1.default.model("Blog", blogSchema);
