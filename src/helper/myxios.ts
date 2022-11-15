import axios from 'axios';
import utils from './utils';

const BASE_JAV: string = 'https://www.javbus.com/';
let isCreateSession: boolean = false;

const createSession = async () => {
  isCreateSession = true;
  const resp = await axios.post(BASE_JAV);
  const cookie = resp.headers['set-cookie'] ? resp.headers['set-cookie'][0] : '';
  const sessid = utils.regex(/php.*?;/gim, cookie);
  const newCookie = `${sessid.join('')} existmag=all;`;
  axios.defaults.headers.Cookie = newCookie;
  return cookie;
};

async function getXios() {
  if (!isCreateSession) await createSession();
  console.log(axios.defaults.headers);
  axios.defaults.headers.Cookie;
  // const result = await axios.get(BASE_JAV);
  // return result.data;
}

// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     console.log('INTERCEPTIONN', config);
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

export { getXios };
