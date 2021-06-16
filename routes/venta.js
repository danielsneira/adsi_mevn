import { Router } from 'express';
import ventaControllers from '../controllers/venta.js'
import { existeUsuarioById } from '../helpers/usuarios.js';
import { existePersonaById, validarPersona } from '../helpers/personas.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js'
import validarRoles from '../middlewares/validar-rol.js'
import { check } from 'express-validator';

const router = Router();

router.post('/', [
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
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

], ventaControllers.ventaPost);
router.get('/', [
    validarJWT,
    validarRoles('VENDEDOR_ROL'),

], ventaControllers.ventaGet);
router.get('/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL'),

], ventaControllers.ventaGetById);
router.put('/activar/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL'),

], ventaControllers.ventaPutActivar);
router.put('/desactivar/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL'),

], ventaControllers.ventaPutDesactivar);

export default router;