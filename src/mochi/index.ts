import { Router } from 'express';
import utils from '../helper/utils';
import pathc from '../helper/pathc';
import { downloadAudioGoogleTrans } from '../helper/download';

const mochiRouter: Router = Router();

let listMD5: string[] = [];

!utils.isExist(pathc.mochi.audio) && utils.createFolder(pathc.mochi.audio);

if (!utils.isExist(pathc.mochi.listMD5File)) {
  utils.createFolder(pathc.mochi.listMD5Dir);
  utils.writeStream(pathc.mochi.listMD5File, JSON.stringify([]));
} else {
  utils.readFilePromise(pathc.mochi.listMD5File, 'utf8').then((data) => {
    listMD5 = JSON.parse(data as string);
  });
}

mochiRouter.post('/audio', async (req, res) => {
  if (listMD5.includes(req.body.md5)) {
    res.send({ error: true, msg: 'Md5 code is exist' });
  } else {
    const result = await downloadAudioGoogleTrans(
      req.body.text,
      `${pathc.mochi.audio}/${req.body.md5}.mp3`
    );
    if (result) {
      listMD5.push(req.body.md5);
      await utils.writeStream(pathc.mochi.listMD5File, JSON.stringify(listMD5));
      res.send({ success: true, listMD5, msg: 'Download audio from Google Tranaslte success' });
    } else res.send({ error: true, msg: 'Cannot download audio from Google Translate' });
  }
});

mochiRouter.get('/md5', (req, res) => {
  res.send(listMD5);
});

export default mochiRouter;
