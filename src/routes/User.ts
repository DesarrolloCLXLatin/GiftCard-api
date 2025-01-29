import { Router } from 'express';
import * as Middleware from '../middleware/index';
import * as UserService from '../services/User';

export const UserRouter = Router();


UserRouter.post('/register', [], Middleware.handleRequest(UserService.register));

UserRouter.post('/update-password', Middleware.handleRequest(UserService.updatePassword));
