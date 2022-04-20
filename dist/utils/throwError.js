"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throwError = (next, error) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    next(error);
};
exports.default = throwError;
