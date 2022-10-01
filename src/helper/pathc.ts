import * as dotenv from 'dotenv';
import { resolve, join } from 'path';

dotenv.config();
const rootDir = resolve('./');
const staticDir = join(rootDir, 'static');

const pathc = {
  staticDir,
  JT: {
    uploadDir: join(staticDir, process.env.JT as string, 'upload')
  }
};

export default pathc;
