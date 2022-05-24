"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const is_auth_1 = __importDefault(require("../middlewares/is-auth"));
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
//User comments section...
router.get("/comment", userController_1.getComments);
router.post("/comment", 
// isAuth, //middleware for checking token, not using here as its a public route
[(0, express_validator_1.body)("name").trim().isLength({ min: 3 })], userController_1.postComments);
router.delete("/comment/:id", is_auth_1.default, userController_1.deleteComment);
//User comments section ends...
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid").normalizeEmail(),
    (0, express_validator_1.body)("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 chars long"),
], userController_1.loginController);
exports.default = router;
