import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../middlewares/validar-jwt.js';


const usuarioControllers = {
    usuarioGet: async (req, res) => {
        const value = req.query.value;
        const usuario = await Usuario.find({
            $or: [
                { nombre: new RegExp(value, 'i') },
                { email: new RegExp(value, 'i') }
            ],
        });

        res.json({
            usuario
        })
    },
    usuarioGetById: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario
            .findById(id);

        res.json({
            usuario
        })
    },
    usuarioPost: async (req, res) => {
        const { nombre, email, password, rol } = req.body;
        const usuario = new Usuario({ nombre, email, password, rol });

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        res.json({
            usuario
        })
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.json({
                msg: 'usuario/password incorrectos'
            })
        }
        if (usuario.estado === 0) {
            return res.json({
                msg: 'usuario inactivo'
            })
        }
        const validarPassword = bcrypt.compareSync(password, usuario.password)
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'usuario o clave incorrecta'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    },

    usuarioPut: async (req, res) => {
        const { id } = req.params;
        const { _id, estado, createdAt, __v, email, rol, password, ...resto } = req.body;

        if (password) {
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            usuario
        })
    },

    usuarioPutActivar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });

        res.json({
            "usuario": usuario.estado
        })
    },
    usuarioPutDesactivar: async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 });

        res.json({
            "usuario": usuario.estado
        })
    }

}


export default usuarioControllers;
