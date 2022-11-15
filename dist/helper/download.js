"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAudioGoogleTrans = exports.downloadCoverJav = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const utils_1 = __importDefault(require("./utils"));
async function downloadCoverJav(url, code, stoDir) {
    !utils_1.default.isExist(stoDir) && utils_1.default.createFolder(stoDir);
    const writeImg = (0, fs_1.createWriteStream)(`${stoDir}/${code}.${utils_1.default.getFileExt(url)}`);
    const response = await (0, axios_1.default)({ url, method: 'GET', responseType: 'stream' });
    response.data.pipe(writeImg);
    return new Promise((resolve, reject) => {
        writeImg.on('finish', resolve);
        writeImg.on('error', reject);
    });
}
exports.downloadCoverJav = downloadCoverJav;
async function downloadAudioGoogleTrans(str, pathName) {
    const audioFile = (0, fs_1.createWriteStream)(pathName);
    const url = `https://translate.google.com/translate_tts?ie=UTF-&&client=tw-ob&tl=en&q=${str}`;
    const response = await (0, axios_1.default)({ url, method: 'GET', responseType: 'stream' });
    response.data.pipe(audioFile);
    return new Promise((resolve, reject) => {
        audioFile.on('finish', () => {
            resolve(true);
        });
        audioFile.on('error', () => {
            reject(false);
        });
    });
}
exports.downloadAudioGoogleTrans = downloadAudioGoogleTrans;
