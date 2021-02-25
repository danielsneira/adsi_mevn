import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import {} from 'dotenv/config'

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(dotenv());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});
