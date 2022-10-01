"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("./upload"));
const extract_1 = __importDefault(require("./extract"));
const jtRouter = (0, express_1.Router)();
jtRouter.use('/upload', upload_1.default);
jtRouter.use('/extract', extract_1.default);
exports.default = jtRouter;
