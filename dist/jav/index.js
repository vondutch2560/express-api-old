"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const javbus_1 = __importDefault(require("./javbus"));
const javRouter = (0, express_1.Router)();
javRouter.use('/javbus', javbus_1.default);
exports.default = javRouter;
