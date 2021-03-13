import { Router } from 'express';
import categoriaControllers from '../controllers/categoria.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js'
import { existeCategoriaById, existeCategoriaByNombre } from '../helpers/categorias.js';

const router = Router();

router.get('/', categoriaControllers.categoriaGet);
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaGetById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
], categoriaControllers.categoriaPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre),

    validarCampos
], categoriaControllers.categoriaPut);

router.put('/activar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaPutActivar);

router.put('/desactivar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaPutDesactivar);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaControllers.categoriaDelete);

export default router;
