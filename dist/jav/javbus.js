"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const utils_1 = __importDefault(require("../helper/utils"));
const pathc_1 = __importDefault(require("../helper/pathc"));
const download_1 = require("../helper/download");
const router = (0, express_1.Router)();
const JAV_BUS_URL = 'https://www.javbus.com/';
const rgxMovieCover = /frame[\s\S]*?src="([\s\S]*?jpg)/gm;
const rgxMovieCode = /photo-info[\s\S]*?<date>(.+?)<\/date>/gm;
const rgxMovieDate = /photo-info[\s\S]*?<\/date>[\s\S]*?<date>(.+?)<\//gm;
let phpsessid = '';
async function createSession() {
    const resp = await axios_1.default.post(JAV_BUS_URL);
    const cookie = resp.headers['set-cookie'] ? resp.headers['set-cookie'][0] : '';
    return utils_1.default.regex(/php.*?;/gim, cookie).join('');
}
function createInstanceAxios(sessid, existMag) {
    const cookie = `${sessid} existmag=${existMag};`;
    const instanceJavBusAxios = axios_1.default.create({
        baseURL: JAV_BUS_URL,
        method: 'GET',
        headers: { Cookie: cookie }
    });
    return instanceJavBusAxios;
}
function filterData(sourceHTML) {
    const arrCover = utils_1.default.regex(rgxMovieCover, sourceHTML, { groupIndex: 1 });
    const arrCode = utils_1.default.regex(rgxMovieCode, sourceHTML, { groupIndex: 1 });
    const arrDate = utils_1.default.regex(rgxMovieDate, sourceHTML, { groupIndex: 1 });
    const fixArrCover = arrCover.map((cover, index) => {
        if (cover.match(/http/g) === null) {
            return {
                cover: `https://www.javbus.com${cover}`,
                code: arrCode[index],
                date: arrDate[index]
            };
        }
        return {
            cover,
            code: arrCode[index],
            date: arrDate[index]
        };
    });
    return fixArrCover;
}
function downloadCover() { }
router.get('/', async (req, res) => {
    try {
        await (0, download_1.downloadCoverJav)('https://www.javbus.com/pics/thumb/96jm.jpg', 'dasd-100', pathc_1.default.jav.coverSmall);
    }
    catch (error) {
        throw error;
    }
    res.send(true);
});
exports.default = router;
