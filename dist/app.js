"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), { flags: "a" });
// Middlewares
app.use((0, helmet_1.default)()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use((0, compression_1.default)()); // Compress all routes
app.use((0, morgan_1.default)("combined", { stream: accessLogStream })); // Logging
app.use(body_parser_1.default.json());
// enable CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/user", user_1.default);
// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
});
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log("Server is running on port 8080");
    });
})
    .catch((err) => console.log(err));
