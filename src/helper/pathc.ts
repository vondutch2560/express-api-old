import * as dotenv from 'dotenv';
import { resolve, join } from 'path';
import os from 'os';

dotenv.config();
const rootDir = resolve('./');
const staticDir = join(rootDir, 'static');
const mochiAudioDir = join(os.homedir(), 'sambashare', 'Seagate', 'Mochi', 'audio');
const mochiListMd5Dir = join(staticDir, 'mochi');
const mochiListMd5File = join(staticDir, 'mochi', 'md5.json');

const pathc = {
  staticDir,
  JT: {
    uploadDir: join(staticDir, process.env.JT as string, 'upload')
  },
  jav: {
    coverSmall: join(staticDir, 'jav', 'cover', 'small'),
    coverFull: join(staticDir, 'jav', 'cover')
  },
  mochi: {
    listMD5Dir: mochiListMd5Dir,
    listMD5File: mochiListMd5File,
    audio: mochiAudioDir
  }
};

export default pathc;
