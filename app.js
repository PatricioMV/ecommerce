import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose';
import passport from 'passport';
import handlebars from 'express-handlebars'
import path from 'path';
import { __dirname } from './utils/utils.js';
import { MONGO_URL } from './config.js';
import { productosRouter } from './router/productos.router.js';
import { dashRouter } from './router/dash.router.js'
import { cartRouter } from './router/cart.router.js'
import { chatRouter } from './router/chat.router.js';
import { initializePassport } from './utils/passport.config.js';

const app = express();
const server = app.listen(8080, () => {
    console.log(`Servidor listo`);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const staticPath = path.join(__dirname, '..', 'public');
app.use(express.static(staticPath));
app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
() => console.log('Conectado a Mongo'))

app.use(session({
    store: MongoStore.create({ 
        client: mongoose.connection.getClient(),
        collectionName: 'sessions'
    }),
    key: 'PVecommerce',
    secret: 'm3lon',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
    ttl: 7891968
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', dashRouter)
app.use('/productos', productosRouter);
app.use('/carrito', cartRouter);
app.use('/chat', chatRouter);

app.use((req, res) => {
    res.redirect('/login');
});

