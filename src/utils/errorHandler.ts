import { Response } from 'express';
import ErrorMessage from '../constants/errorMsg';
import StatusCode from '../constants/statusCode';

function errorHandler(error: Error, res: Response) {
  if (error.message === ErrorMessage.UPSTREAM_ERROR) res.status(StatusCode.UPSTREAM_ERROR);
  if (error.message === ErrorMessage.CLIENT_ERROR) res.status(StatusCode.CLIENT_ERROR);
  if (error.message === ErrorMessage.SERVER_ERROR) res.status(StatusCode.SERVER_ERROR);
}

export default errorHandler;
