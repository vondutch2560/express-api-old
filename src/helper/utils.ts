import { existsSync, mkdirSync, readdirSync, readFile, statSync } from 'fs';

const utils = {
  createFolder(absPath: string) {
    mkdirSync(absPath, { recursive: true });
  },

  getFileExt(str: string): string | undefined {
    return str.split('.').pop();
  },

  isEmptyObj(obj: Object): boolean {
    return JSON.stringify(obj) === '{}';
  },

  isExist(absPath: string): boolean {
    const result = existsSync(absPath);
    return result;
  },

  isFile(absPath: string): boolean {
    return statSync(absPath).isFile();
  },

  isFolder(absPath: string): boolean {
    return statSync(absPath).isDirectory();
  },

  listInDir(absPath: string, isFullPath: boolean = false): string[] {
    const itemsInDir = readdirSync(absPath);
    return itemsInDir.reduce((acc: string[], item) => {
      if (this.isFile(`${absPath}/${item}`)) {
        if (isFullPath) acc.push(`${absPath}/${item}`);
        else acc.push(item);
      }
      return acc;
    }, []);
  },

  readFilePromise(absPath: string, encoding: null | 'utf8' = null): Promise<Buffer | string> {
    return new Promise((resolve, reject) => {
      readFile(absPath, encoding, function (error, data) {
        if (error) reject(error);
        resolve(data);
      });
    });
  },

  removeFileExt(str: string): string {
    return str.split('.').slice(0, -1).join('.');
  },

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};

export default utils;
