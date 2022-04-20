"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get("/comment", userController_1.getComments);
router.post("/comment", [(0, express_validator_1.body)("name").trim().isLength({ min: 1 })], userController_1.postComments);
exports.default = router;
