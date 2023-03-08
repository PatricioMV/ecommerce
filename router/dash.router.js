import express from 'express';
import { dashController } from '../controller/dash.controller.js';

export const dashRouter = express.Router();

dashRouter.get('/login', dashController.renderLogin);

dashRouter.post('/login', dashController.postLogin);

dashRouter.get('/logout', dashController.getLogout);

dashRouter.get('/register', dashController.renderRegister);

dashRouter.post('/register', dashController.postRegister);

