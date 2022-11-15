import { Router } from 'express';
import axios, { AxiosInstance } from 'axios';
import utils from '../helper/utils';
import pathc from '../helper/pathc';
import { downloadCoverJav } from '../helper/download';

const router: Router = Router();

type DataMovieJavbus = {
  cover: string;
  code: string;
  date: string;
};

const JAV_BUS_URL: string = 'https://www.javbus.com/';
const rgxMovieCover = /frame[\s\S]*?src="([\s\S]*?jpg)/gm;
const rgxMovieCode = /photo-info[\s\S]*?<date>(.+?)<\/date>/gm;
const rgxMovieDate = /photo-info[\s\S]*?<\/date>[\s\S]*?<date>(.+?)<\//gm;

let phpsessid: string = '';

async function createSession(): Promise<string> {
  const resp = await axios.post(JAV_BUS_URL);
  const cookie = resp.headers['set-cookie'] ? resp.headers['set-cookie'][0] : '';
  return utils.regex(/php.*?;/gim, cookie).join('');
}

function createInstanceAxios(sessid: string, existMag: string): AxiosInstance {
  const cookie = `${sessid} existmag=${existMag};`;
  const instanceJavBusAxios = axios.create({
    baseURL: JAV_BUS_URL,
    method: 'GET',
    headers: { Cookie: cookie }
  });
  return instanceJavBusAxios;
}

function filterData(sourceHTML: string): DataMovieJavbus[] {
  const arrCover = utils.regex(rgxMovieCover, sourceHTML, { groupIndex: 1 });
  const arrCode = utils.regex(rgxMovieCode, sourceHTML, { groupIndex: 1 });
  const arrDate = utils.regex(rgxMovieDate, sourceHTML, { groupIndex: 1 });

  const fixArrCover = arrCover.map((cover, index) => {
    if (cover.match(/http/g) === null) {
      return {
        cover: `https://www.javbus.com${cover}`,
        code: arrCode[index],
        date: arrDate[index]
      };
    }
    return {
      cover,
      code: arrCode[index],
      date: arrDate[index]
    };
  });
  return fixArrCover;
}

function downloadCover() {}

router.get('/', async (req, res) => {
  // if (phpsessid === '') phpsessid = await createSession();
  // const existMag: string = req.query.existmag ? 'mag' : 'all';
  // const getXios = createInstanceAxios(phpsessid, existMag);
  // const { data } = await getXios('/');
  // const dataFilter = filterData(data);
  try {
    await downloadCoverJav(
      'https://www.javbus.com/pics/thumb/96jm.jpg',
      'dasd-100',
      pathc.jav.coverSmall
    );
  } catch (error) {
    throw error;
  }
  res.send(true);
});

export default router;
