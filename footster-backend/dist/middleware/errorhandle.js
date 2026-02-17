"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res, next) => {
    if (err instanceof Error) {
        const status = 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({
            message,
            status
        });
    }
};
