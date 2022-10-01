import * as dotenv from 'dotenv';
import { resolve as resolvePath, join as joinPath } from 'path';
import { Router } from 'express';
import pdf from 'pdf-parse';
import utils from '../helper/utils';
import pathc from '../helper/pathc';

dotenv.config();

const router: Router = Router();

async function parsePDF(dataBuffer: Buffer, time: number = 1): Promise<string | boolean> {
  try {
    const { text } = await pdf(dataBuffer);
    return text;
  } catch (error) {
    if (time === 10) return false;
    time += 1;
    await utils.sleep(200);
    return await parsePDF(dataBuffer, time);
  }
}

router.get('/:filename', async (req, res) => {
  const filename = req.params.filename;
  const fileExt = utils.getFileExt(filename);
  const listFile = utils.listInDir(pathc.JT.uploadDir);
  const isExistFile = listFile.includes(filename);

  if (!isExistFile) res.send({ msg: 'File does not exist' });

  if (fileExt === 'pdf') {
    const dataBuffer = (await utils.readFilePromise(`${pathc.JT.uploadDir}/${filename}`)) as Buffer;
    const dataPDF = await parsePDF(dataBuffer);

    if (!dataPDF) res.send({ msg: 'Cannot parse this file' });
    res.send({ rawData: dataPDF });
  }

  if (fileExt === 'html') {
    try {
      const rawHTML = (await utils.readFilePromise(
        `${pathc.JT.uploadDir}/${filename}`,
        'utf8'
      )) as string;
      res.send({ rawData: rawHTML });
    } catch (error) {
      res.send({ msg: 'Cannot parse this file' });
    }
  }
});

export default router;
