import { Router } from 'express';
import compraControllers from '../controllers/compra.js'
import { existeUsuarioById } from '../helpers/usuarios.js';
import { existePersonaById, validarProveedor } from '../helpers/personas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js'
import validarRoles from '../middlewares/validar-rol.js'
import { check } from 'express-validator';

const router = Router();

router.post('/', [
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('usuario', 'El Usuario es obligatorio').not().isEmpty(),
    check('usuario').custom(existeUsuarioById),
    check('persona', 'Persona es obligatorio').not().isEmpty(),
    check('persona').custom(existePersonaById),
    check('persona').custom(validarProveedor),
    check('tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
    check('serieComprobante', 'La serie del comprobante es obligatorio').not().isEmpty(),
    check('numComprobante', 'El numero del comprobante es obligatorio').not().isEmpty(),
    check('impuesto', 'El impuesto es obligatorio').not().isEmpty(),
    check('detalles', 'detalles no puede estar vacio').not().isEmpty(),
    validarCampos

], compraControllers.compraPost);
router.get('/', [
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),

], compraControllers.compraGet);
router.get('/:id', [
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),

], compraControllers.compraGetById);
router.put('/activar/:id', [
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),

], compraControllers.compraPutActivar);
router.put('/desactivar/:id', [
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),

], compraControllers.compraPutDesactivar);

export default router;