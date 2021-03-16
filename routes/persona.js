import {Router} from 'express';
import personaControllers from '../controllers/persona.js'

const router = Router();

router.post('/', personaControllers.personaPost);
router.get('/', personaControllers.personaGet);
router.get('/listClientes', personaControllers.personaGetClientes);
router.get('/listProveedores', personaControllers.personaGetProveedores);
router.get('/:id', personaControllers.personaGetById);
router.put('/:id', personaControllers.personaPut);
router.put('/activar/:id', personaControllers.personaPutActivar);
router.put('/desactivar/:id', personaControllers.personaPutDesactivar);

export default router;