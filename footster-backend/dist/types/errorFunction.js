"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorFunction;
function errorFunction(error) {
    if (error instanceof Error) {
        return { message: error.message, status: 500 };
    }
    return { message: "Unknown error!", status: 500 };
}
