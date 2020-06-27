import log from './log';
import { apiMiddleware } from 'redux-api-middleware';
import authHandling from './authHandling';

export default [apiMiddleware, authHandling, log];
