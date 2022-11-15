import express, { Express } from 'express';
import cors from 'cors';
import pathc from './helper/pathc';
import routerJTCompany from './JTcompany/index';
import routerJAV from './jav/index';
import routerMochi from './mochi/index';

const app: Express = express();

const corsOption = {
  origin: function (origin: any, callback: Function) {
    if (origin === undefined || origin.match(/(localhost|mochidemy|vone\.one)/gm) !== null)
      callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOption));
app.use(express.json());

app.use('/static', express.static(pathc.staticDir));
app.use('/mochi', express.static(pathc.mochi.audio));

app.use('/jtcompany', routerJTCompany);
app.use('/javlib', routerJAV);
app.use('/mochi', routerMochi);

app.listen(4321, () => {
  console.log('ExpressJS running on 4321');
});
