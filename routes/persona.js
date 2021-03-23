import { Router } from 'express';
import { check } from 'express-validator';
import personaControllers from '../controllers/persona.js';
import { existePersonaByEmail, existePersonaByNombre } from '../helpers/personas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import validarRoles from '../middlewares/validar-rol';

const router = Router();

router.post('/', [
    validarJWT,
    check('tipoPersona', 'El tipo de persona obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existePersonaByNombre),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email').custom(existePersonaByEmail),
    validarCampos
], personaControllers.personaPost);

router.get('/',[
    validarJWT
], personaControllers.personaGet);

router.get('/listClientes',[
    validarJWT,
    validarRoles('VENDEDOR_ROL')
], personaControllers.personaGetClientes);

router.get('/listProveedores',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL')
], personaControllers.personaGetProveedores);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], personaControllers.personaGetById);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], personaControllers.personaPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),

], personaControllers.personaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),

], personaControllers.personaPutDesactivar);

export default router;