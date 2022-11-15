"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXios = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = __importDefault(require("./utils"));
const BASE_JAV = 'https://www.javbus.com/';
let isCreateSession = false;
const createSession = async () => {
    isCreateSession = true;
    const resp = await axios_1.default.post(BASE_JAV);
    const cookie = resp.headers['set-cookie'] ? resp.headers['set-cookie'][0] : '';
    const sessid = utils_1.default.regex(/php.*?;/gim, cookie);
    const newCookie = `${sessid.join('')} existmag=all;`;
    axios_1.default.defaults.headers.Cookie = newCookie;
    return cookie;
};
async function getXios() {
    if (!isCreateSession)
        await createSession();
    console.log(axios_1.default.defaults.headers);
    axios_1.default.defaults.headers.Cookie;
}
exports.getXios = getXios;
