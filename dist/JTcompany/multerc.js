"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const utils_1 = __importDefault(require("../utils"));
const pathc_1 = __importDefault(require("../pathc"));
const storage = multer_1.default.diskStorage({
    destination(_req, _file, cb) {
        cb(null, pathc_1.default.uploadJT);
    },
    filename(_req, file, cb) {
        const fileName = utils_1.default.removeFileExt(file.originalname);
        const fileExt = utils_1.default.getFileExt(file.originalname);
        cb(null, `${fileName} - ${String(Date.now()).slice(-10)}.${fileExt}`);
    }
});
const fileFilter = (_req, file, callback) => {
    const ext = utils_1.default.getFileExt(file.originalname);
    if (ext !== 'pdf' && ext !== 'html') {
        return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
};
const uploadMulter = (0, multer_1.default)({ storage, fileFilter }).single('dropzonefile');
