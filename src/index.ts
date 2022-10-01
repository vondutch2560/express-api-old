import express, { Express } from 'express';
import cors from 'cors';
import pathc from './helper/pathc';
import routerJTCompany from './JTcompany/index';

const app: Express = express();

const corsOption = {
  origin: function (origin: any, callback: Function) {
    // const whiteListCors = ['http://localhost:3000'];
    // if (whiteListCors.indexOf(origin) !== -1) callback(null, true);

    if (origin === undefined || origin.match(/(localhost|vone\.one)/gm) !== null)
      callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOption));

app.use('/static', express.static(pathc.staticDir));

app.use('/jtcompany', routerJTCompany);

app.listen(4321, () => {
  console.log('ExpressJS running on 4321');
});
