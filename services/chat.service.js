import { Service } from './model.service.js';
import { chatDao } from '../daos/chat.dao.js'

export class ChatService extends Service {
    constructor(){
        super(chatDao);
    }
}