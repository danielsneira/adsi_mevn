import {Router} from 'express';
import articuloControllers from '../controllers/articulo.js'

const router = Router();

router.get('/', articuloControllers.articuloGet);
router.get('/:id', articuloControllers.articuloGetById);
router.post('/', articuloControllers.articuloPost);
router.put('/:id', articuloControllers.articuloPut);
router.put('/activar/:id', articuloControllers.articuloPutActivar);
router.put('/desactivar/:id', articuloControllers.articuloPutDesactivar);

export default router;
