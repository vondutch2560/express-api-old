"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = require("express");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const utils_1 = __importDefault(require("../helper/utils"));
const pathc_1 = __importDefault(require("../helper/pathc"));
dotenv.config();
const router = (0, express_1.Router)();
async function parsePDF(dataBuffer, time = 1) {
    try {
        const { text } = await (0, pdf_parse_1.default)(dataBuffer);
        return text;
    }
    catch (error) {
        if (time === 10)
            return false;
        time += 1;
        await utils_1.default.sleep(200);
        return await parsePDF(dataBuffer, time);
    }
}
router.get('/:filename', async (req, res) => {
    const filename = req.params.filename;
    const fileExt = utils_1.default.getFileExt(filename);
    const listFile = utils_1.default.listInDir(pathc_1.default.JT.uploadDir);
    const isExistFile = listFile.includes(filename);
    if (!isExistFile)
        res.send({ msg: 'File does not exist' });
    if (fileExt === 'pdf') {
        const dataBuffer = (await utils_1.default.readFilePromise(`${pathc_1.default.JT.uploadDir}/${filename}`));
        const dataPDF = await parsePDF(dataBuffer);
        if (!dataPDF)
            res.send({ msg: 'Cannot parse this file' });
        res.send({ rawData: dataPDF });
    }
    if (fileExt === 'html') {
        try {
            const rawHTML = (await utils_1.default.readFilePromise(`${pathc_1.default.JT.uploadDir}/${filename}`, 'utf8'));
            res.send({ rawData: rawHTML });
        }
        catch (error) {
            res.send({ msg: 'Cannot parse this file' });
        }
    }
});
exports.default = router;
