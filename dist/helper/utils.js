"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils = {
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
    removeFileExt(str) {
        return str.split('.').slice(0, -1).join('.');
    },
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
exports.default = utils;
