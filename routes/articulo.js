import {Router} from 'express';
import { check } from 'express-validator';
import articuloControllers from '../controllers/articulo.js'
import { existeArticuloById } from '../helpers/articulo.js';
import { existeCategoriaById } from '../helpers/categorias.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import validarRoles from '../middlewares/validar-rol.js';

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL')
], articuloControllers.articuloGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
], articuloControllers.articuloGetById);

router.post('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(existeCategoriaById),
    check('codigo', 'El codigo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precioVenta', 'El precio de venta es obligatorio').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    validarCampos
], articuloControllers.articuloPost);

router.put('/:id',[
	validarJWT,
    validarRoles('ALMACENISTA_ROL'),
	check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeArticuloById),
], articuloControllers.articuloPut);

router.put('/activar/:id',[
	validarJWT,
    validarRoles('ALMACENISTA_ROL'),
	check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeArticuloById),
], articuloControllers.articuloPutActivar);

router.put('/desactivar/:id',[
	validarJWT,
    validarRoles('ALMACENISTA_ROL'),
	check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeArticuloById),
], articuloControllers.articuloPutDesactivar);

export default router;
