import {Router} from 'express';
import compraControllers from '../controllers/compra.js'

const router = Router();

router.post('/', compraControllers.compraPost);
router.get('/', compraControllers.compraGet);
router.get('/:id', compraControllers.compraGetById);
router.put('/activar/:id', compraControllers.compraPutActivar);
router.put('/desactivar/:id', compraControllers.compraPutDesactivar);

export default router;