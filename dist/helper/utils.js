"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const promises_1 = require("node:fs/promises");
const utils = {
    convertVnChar(str) {
        str = str.replace(/á|à|ả|ã|ạ|â|ấ|ầ|ẩ|ẫ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ/g, 'a');
        str = str.replace(/À|Á|Ả|Ã|Ạ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ/g, 'A');
        str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o');
        str = str.replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, 'O');
        str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e');
        str = str.replace(/É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, 'E');
        str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u');
        str = str.replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, 'U');
        str = str.replace(/í|ì|ỉ|ĩ|ị/g, 'i');
        str = str.replace(/Í|Ì|Ỉ|Ĩ|Ị/g, 'I');
        str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
        str = str.replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, 'Y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/Đ/g, 'D');
        str = str.replace(/\u0300|\u0301|\u0302|\u0303|\u0309|\u0323/g, '');
        str = str.replace(/\u02C6|\u0306|\u031B/g, '');
        str = str.replace(/ + /g, ' ');
        str = str.trim();
        return str;
    },
    createFolder(absPath) {
        (0, fs_1.mkdirSync)(absPath, { recursive: true });
    },
    getFileExt(str) {
        return str.split('.').pop();
    },
    isEmptyObj(obj) {
        return JSON.stringify(obj) === '{}';
    },
    isExist(absPath) {
        const result = (0, fs_1.existsSync)(absPath);
        return result;
    },
    isFile(absPath) {
        return (0, fs_1.statSync)(absPath).isFile();
    },
    isFolder(absPath) {
        return (0, fs_1.statSync)(absPath).isDirectory();
    },
    listInDir(absPath, isFullPath = false) {
        const itemsInDir = (0, fs_1.readdirSync)(absPath);
        return itemsInDir.reduce((acc, item) => {
            if (this.isFile(`${absPath}/${item}`)) {
                if (isFullPath)
                    acc.push(`${absPath}/${item}`);
                else
                    acc.push(item);
            }
            return acc;
        }, []);
    },
    readFilePromise(absPath, encoding = null) {
        return new Promise((resolve, reject) => {
            (0, fs_1.readFile)(absPath, encoding, function (error, data) {
                if (error)
                    reject(error);
                resolve(data);
            });
        });
    },
    regex(rgx, source, options = {}) {
        const isMatch = options.isMatch || true;
        const groupIndex = options.groupIndex || 9999;
        let m;
        const resultMatch = [];
        const resultGroup = [];
        while ((m = rgx.exec(source)) !== null) {
            if (m.index === rgx.lastIndex) {
                rgx.lastIndex++;
            }
            m.forEach((match, grpInd) => {
                if (isMatch)
                    resultMatch.push(match);
                if (grpInd >= groupIndex)
                    resultGroup.push(match);
            });
        }
        return groupIndex !== 9999 ? resultGroup : resultMatch;
    },
    removeFileExt(str) {
        return str.split('.').slice(0, -1).join('.');
    },
    async removeFilesInDir(absPath) {
        const filesInDir = this.listInDir(absPath, true);
        try {
            await Promise.all(filesInDir.map((file) => (0, promises_1.unlink)(file)));
            return true;
        }
        catch (error) {
            return false;
        }
    },
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
    writeStream(absPath, data) {
        const cws = (0, fs_1.createWriteStream)(absPath);
        cws.write(data);
        cws.end();
        return new Promise((resolve, reject) => {
            cws.on('finish', resolve);
            cws.on('error', reject);
        });
    }
};
exports.default = utils;
