"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = __importDefault(require("../helper/utils"));
const pathc_1 = __importDefault(require("../helper/pathc"));
const multerc_1 = __importDefault(require("../helper/multerc"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => {
    multerc_1.default.uploadJT(req, res, function (err) {
        if (err)
            res.send(err);
        else
            res.send('success upload');
    });
});
router.get('/', (_req, res) => {
    if (utils_1.default.isExist(pathc_1.default.JT.uploadDir)) {
        const fileList = utils_1.default.listInDir(pathc_1.default.JT.uploadDir);
        res.send({ fileList, msg: 'Read file in dir done' });
    }
    else {
        utils_1.default.createFolder(pathc_1.default.JT.uploadDir);
        res.send({ fileList: [], msg: 'Created dir upload for jtcompany done.' });
    }
});
exports.default = router;
