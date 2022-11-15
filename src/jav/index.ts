import { Router } from 'express';
import routerJavbus from './javbus';

const javRouter: Router = Router();

javRouter.use('/javbus', routerJavbus);

export default javRouter;
