import { Router } from 'express';
import utils from '../helper/utils';
import pathc from '../helper/pathc';
import multerc from '../helper/multerc';

const router: Router = Router();

router.post('/', (req, res) => {
  multerc.uploadJT(req, res, function (err) {
    if (err) res.send(err);
    else res.send('success upload');
  });
});

router.get('/', (_req, res) => {
  if (utils.isExist(pathc.JT.uploadDir)) {
    const fileList = utils.listInDir(pathc.JT.uploadDir);
    res.send({ fileList, msg: 'Read file in dir done' });
  } else {
    utils.createFolder(pathc.JT.uploadDir);
    res.send({ fileList: [], msg: 'Created dir upload for jtcompany done.' });
  }
});

// router.delete('/', async (_req, res) => {
//   const result = await fns.removeFilesInDir('file-upload')
//   if (result) res.send(fns.resSuccess('Delete all file successful'))
//   else res.send(fns.resError(2))
// })

export default router;
