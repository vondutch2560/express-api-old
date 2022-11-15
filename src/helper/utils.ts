import { createWriteStream, existsSync, mkdirSync, readdirSync, readFile, statSync } from 'fs';
import { unlink } from 'node:fs/promises';

interface OptionsRegex {
  isMatch?: boolean;
  groupIndex?: number;
}

const utils = {
  convertVnChar(str: string): string {
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

    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0302|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ^, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư

    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();

    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    // str = str.replace(
    //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    //   ' '
    // );

    // Tìm mã ký từ dùng str.codePointAt(0).toString(16).  Thèm dòng toString(16) để lấy số có thể dùng cho regex
    // Giải mã ký từ dùng String.fromCodePoint(710)
    return str;
  },

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

  regex(rgx: RegExp, source: string, options: OptionsRegex = {}): string[] {
    const isMatch = options.isMatch || true;
    const groupIndex = options.groupIndex || 9999;

    let m;
    const resultMatch: string[] = [];
    const resultGroup: string[] = [];

    while ((m = rgx.exec(source)) !== null) {
      if (m.index === rgx.lastIndex) {
        rgx.lastIndex++;
      }

      m.forEach((match, grpInd) => {
        if (isMatch) resultMatch.push(match);
        if (grpInd >= groupIndex) resultGroup.push(match);
      });
    }
    return groupIndex !== 9999 ? resultGroup : resultMatch;
  },

  removeFileExt(str: string): string {
    return str.split('.').slice(0, -1).join('.');
  },

  async removeFilesInDir(absPath: string): Promise<boolean> {
    const filesInDir = this.listInDir(absPath, true);
    try {
      await Promise.all(filesInDir.map((file) => unlink(file)));
      return true;
    } catch (error) {
      return false;
    }
  },

  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  writeStream(absPath: string, data: string | Buffer): Promise<boolean> {
    const cws = createWriteStream(absPath);
    cws.write(data);
    cws.end();
    return new Promise((resolve, reject) => {
      cws.on('finish', resolve);
      cws.on('error', reject);
    });
  }
};

export default utils;
