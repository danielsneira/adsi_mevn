import { Router } from 'express';
import usuarioControllers from '../controllers/usuario.js'
import { existeUsuarioById } from '../helpers/usuarios.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/', usuarioControllers.usuarioGet);
router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioGetById);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], usuarioControllers.usuarioPost);

router.post('/login',[
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),

], usuarioControllers.login);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioPut);

router.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioPutActivar);

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuarioControllers.usuarioPutDesactivar);

export default router;
