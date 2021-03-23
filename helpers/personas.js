import Persona from '../models/persona.js';

const existePersonaByEmail = async (email) => {
    const existe = await Persona.findOne({email});

    if(existe) throw Error ('Ya existe una persona con ese email');
}

const existePersonaByNombre = async (nombre) => {
    const existe = await Persona.findOne({nombre});

    if(existe) throw Error ('Ya existe una persona con ese nombre');
}

export {existePersonaByEmail, existePersonaByNombre}
