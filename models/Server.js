import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config.js';

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
        //TODO
        // app.get('/', function (req, res) {
        //     res.send('hello world');
        // });
    }

    async conectarBD(){
        await dbConnection();
    }
}

export default Server;
