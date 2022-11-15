"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = __importDefault(require("../helper/utils"));
const pathc_1 = __importDefault(require("../helper/pathc"));
const download_1 = require("../helper/download");
const mochiRouter = (0, express_1.Router)();
let listMD5 = [];
!utils_1.default.isExist(pathc_1.default.mochi.audio) && utils_1.default.createFolder(pathc_1.default.mochi.audio);
if (!utils_1.default.isExist(pathc_1.default.mochi.listMD5File)) {
    utils_1.default.createFolder(pathc_1.default.mochi.listMD5Dir);
    utils_1.default.writeStream(pathc_1.default.mochi.listMD5File, JSON.stringify([]));
}
else {
    utils_1.default.readFilePromise(pathc_1.default.mochi.listMD5File, 'utf8').then((data) => {
        listMD5 = JSON.parse(data);
    });
}
mochiRouter.post('/audio', async (req, res) => {
    if (listMD5.includes(req.body.md5)) {
        res.send({ error: true, msg: 'Md5 code is exist' });
    }
    else {
        const result = await (0, download_1.downloadAudioGoogleTrans)(req.body.text, `${pathc_1.default.mochi.audio}/${req.body.md5}.mp3`);
        if (result) {
            listMD5.push(req.body.md5);
            await utils_1.default.writeStream(pathc_1.default.mochi.listMD5File, JSON.stringify(listMD5));
            res.send({ success: true, listMD5, msg: 'Download audio from Google Tranaslte success' });
        }
        else
            res.send({ error: true, msg: 'Cannot download audio from Google Translate' });
    }
});
mochiRouter.get('/md5', (req, res) => {
    res.send(listMD5);
});
exports.default = mochiRouter;
