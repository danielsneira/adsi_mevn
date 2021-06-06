import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config.js';
import categoria from '../routes/categoria.js'
import usuario from '../routes/usuario.js'
import articulo from '../routes/articulo.js'
import compra from '../routes/compra.js'
import persona from '../routes/persona.js'
import venta from '../routes/venta.js'

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
        this.app.use('/api/articulo', articulo);
        this.app.use('/api/categoria', categoria);
        this.app.use('/api/compra', compra);
        this.app.use('/api/persona', persona);
        this.app.use('/api/usuario', usuario);
        this.app.use('/api/venta', venta);
    }

    async conectarBD(){
      try {
        await dbConnection();
      } catch (error) {
        console.log(error);
      }
    }
}

export default Server;
