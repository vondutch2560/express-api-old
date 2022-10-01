"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pathc_1 = __importDefault(require("./helper/pathc"));
const index_1 = __importDefault(require("./JTcompany/index"));
const app = (0, express_1.default)();
const corsOption = {
    origin: function (origin, callback) {
        if (origin === undefined || origin.match(/(localhost|vone\.one)/gm) !== null)
            callback(null, true);
        else
            callback(new Error('Not allowed by CORS'));
    }
};
app.use((0, cors_1.default)(corsOption));
app.use('/static', express_1.default.static(pathc_1.default.staticDir));
app.use('/jtcompany', index_1.default);
app.listen(4321, () => {
    console.log('ExpressJS running on 4321');
});
