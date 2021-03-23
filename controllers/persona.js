import Persona from '../models/persona.js'

const personaControllers = {
    personaPost: async (req, res) => {
        const { tipoPersona, nombre, tipoDocumento, numDocumento, direccion, telefono, email } = req.body;
        const persona = new Persona({ tipoPersona, nombre, tipoDocumento, numDocumento, direccion, telefono, email });

        await persona.save();

        res.json({
            persona
        })
    },
    personaGet: async (req, res) => {
        const value = req.query.value;
        const persona = await Persona.find({
            $or: [
                { nombre: new RegExp(value, 'i') },
                { email: new RegExp(value, 'i') }
            ],
        });

        res.json({
            persona
        })
    },
    personaGetClientes: async (req, res) => {
        const value = req.query.value;
        const persona = await Persona.find({
            tipoPersona: 'Cliente',
            $or: [
                { tipoPersona: 'Cliente', },
                { nombre: new RegExp(value, 'i') },
                { email: new RegExp(value, 'i') }
            ],
        });

        res.json({
            persona
        })
    },
    personaGetProveedores: async (req, res) => {
        const value = req.query.value;
        const persona = await Persona.find({
            tipoPersona: 'Proveedor',
            $or: [
                { tipoPersona: 'Cliente', },
                { nombre: new RegExp(value, 'i') },
                { email: new RegExp(value, 'i') }
            ],
        });

        res.json({
            persona
        })
    },
    personaGetById: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona
            .findOne({ _id: id });

        res.json({
            persona
        })
    },
    personaPut: async (req, res) => {
        const { id } = req.params;
        const { _id, estado, createdAt, __v, ...resto } = req.body;

        const persona = await Persona.findByIdAndUpdate(id, resto);

        res.json({
            persona
        })
    },
    personaPutActivar: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona.findByIdAndUpdate(id, { estado: 1 });

        res.json({
            "persona": persona.estado
        })
    },
    personaPutDesactivar: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona.findByIdAndUpdate(id, { estado: 0 });

        res.json({
            "persona": persona.estado
        })
    }
}


export default personaControllers;
