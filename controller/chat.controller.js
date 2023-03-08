import { ChatService } from '../services/chat.service.js';

export const chatService = new ChatService();

const crearChat = async(req, res) => {
    const mensaje = {
        email: req.user.email,
        tipo: 'usuario',
        timestamp: new Date().toLocaleString(),
        mensaje: req.body.mensaje
    }
    await chatService.save(mensaje);
    res.redirect('/chat');
}

const getAll = async(req, res) => {
    let db = await chatService.getAll();
    let mensajes = db.map(item => item.toObject());
    res.render('chat', { mensajes } ); 
}

const findById = async(req, res) => {
    let result = await chatService.findById(req.params.id);
    res.status(200).send(result);           
}

const actualizarChat = async(req, res) => {
    let id = parseInt(req.params.id);
    let result = await chatService.update(id, req.body);
    res.status(200).send(result); 
}

const borrarChat = async(req, res) => {
    let result = await chatService.deleteById(req.params.id);
    res.status(200).send(result); 
}

export default {
     crearChat,  getAll, findById, actualizarChat, borrarChat
}