"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info: (...args) => console.info("[INFO]", ...args),
    warn: (...args) => console.warn("[WARN]", ...args),
    error: (...args) => console.error("[ERROR]", ...args),
};
exports.default = logger;
