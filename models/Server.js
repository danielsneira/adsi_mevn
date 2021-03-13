import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config.js';
import categoria from '../routes/categoria.js'
import usuario from '../routes/usuario.js'

class Server {
    constructor() {
        this.port = process.env.PORT
        this.app = express();
        this.middlewares();
        this.conectarBD();
        this.routes();

    }
    
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en el puerto ${this.port}`)
        });
    }

    routes(){
        this.app.use('/api/categoria', categoria);
        this.app.use('/api/usuario', usuario);
    }

    async conectarBD(){
        await dbConnection();
    }
}

export default Server;
