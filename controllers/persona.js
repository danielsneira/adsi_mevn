import Persona from '../models/persona.js'

const personaControllers = {
    personaGet: async (req, res) => {
        const value = req.query.value;
        const persona = await Persona
            .find({
                $or: [
                { nombre: new RegExp(value, 'i') },
                { descripcion: new RegExp(value, 'i') }
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
    personaPost: async (req, res) => {
        const { tipoPersona,nombre, tipoDocumento, numDocumento, direccion, telefono, email  } = req.body;
        const persona = new persona({ tipoPersona,nombre, tipoDocumento, numDocumento, direccion, telefono, email });

        await Persona.save();

        res.json({
            persona
        })
    },
    personaPut: async (req, res) => {
        const { id } = req.params;
        const { _id, estado, createdAt, __v, ...resto} = req.body;

        const persona = await Persona.findByIdAndUpdate(id, resto);

        res.json({
            persona
        })
    },
    personaPutActivar: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona.findByIdAndUpdate(id, {estado: 1});

        res.json({
            "persona": persona.estado
        })
    },
    personaPutDesactivar: async (req, res) => {
        const { id } = req.params;
        const persona = await Persona.findByIdAndUpdate(id, {estado: 0});

        res.json({
            "persona": persona.estado
        })
    },
    personaDelete: async (req, res) => {
        const { id } = req.params;
            
        const persona = await Persona.findByIdAndDelete(id);

        res.json({
            "status": "deleted"
        })
    }
}


export default personaControllers; 
