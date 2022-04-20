"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
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
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
mongoose_1.default
    .connect("mongodb+srv://rajeshvijayan:rajeshVijayan@cluster0.abgtw.mongodb.net/profileApp?retryWrites=true&w=majority")
    .then(() => {
    app.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
})
    .catch((err) => console.log(err));
