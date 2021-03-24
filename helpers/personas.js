import Persona from '../models/persona.js';

const existePersonaByEmail = async (email) => {
    const existe = await Persona.findOne({email});

    if(existe) throw Error ('Ya existe una persona con ese email');
}

const existePersonaById = async(id) => {
	const existe = await Persona.findById(id)
	
	if(!existe){
		throw new Error('el id no existe')
	}
}

const validarProveedor = async(id) => {
	const persona = await Persona.findById(id)

	if(persona.tipoPersona !== 'Proveedor'){
		throw new Error('acceso no autorizado')
	}
}

const existePersonaByNombre = async (nombre) => {
    const existe = await Persona.findOne({nombre});

    if(existe) throw Error ('Ya existe una persona con ese nombre');
}

export {existePersonaByEmail, existePersonaByNombre, validarProveedor, existePersonaById}
