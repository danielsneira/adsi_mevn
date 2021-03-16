import {Router} from 'express';
import ventaControllers from '../controllers/venta.js'

const router = Router();

router.post('/', ventaControllers.ventaPost);
router.get('/', ventaControllers.ventaGet);
router.get('/:id', ventaControllers.ventaGetById);
router.put('/activar/:id', ventaControllers.ventaPutActivar);
router.put('/desactivar/:id', ventaControllers.ventaPutDesactivar);

export default router;