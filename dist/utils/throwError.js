"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throwError = (next, error, message = "Server Error", statusCode = 500) => {
    let err;
    if (!error) {
        err = new Error(message);
        err.statusCode = statusCode;
    }
    else {
        err.statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
    }
    next(err);
};
exports.default = throwError;
