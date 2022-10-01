import { Router } from 'express';
import routerUpload from './upload';
import routerExtract from './extract';

const jtRouter: Router = Router();

jtRouter.use('/upload', routerUpload);
jtRouter.use('/extract', routerExtract);

export default jtRouter;
