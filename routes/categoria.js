import { Router } from 'express';
import categoriaControllers from '../controllers/categoria.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js'
import { existeCategoriaById, existeCategoriaByNombre } from '../helpers/categorias.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import validarRoles from '../middlewares/validar-rol.js';

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL')
], categoriaControllers.categoriaGet);
router.get('/:id', [
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaGetById);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
], categoriaControllers.categoriaPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
], categoriaControllers.categoriaPut);

router.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaPutActivar);

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaPutDesactivar);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaDelete);

export default router;
