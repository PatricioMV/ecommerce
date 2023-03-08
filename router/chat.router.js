import express from 'express';
import chatController  from '../controller/chat.controller.js';
import { idValidator, autentificacion } from '../utils/validators.js';

export const chatRouter = express.Router();

chatRouter.use(autentificacion);

chatRouter.get('/',  chatController.getAll);

chatRouter.get('/:id',  chatController.findById);

chatRouter.post('/', chatController.crearChat);