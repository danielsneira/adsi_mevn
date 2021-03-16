import usuario from "../models/usuario.js"

const existeUsuarioById = async(id) => {
	const existe = await usuario.findById(id)
	
	if(!existe){
		throw new Error('el id no existe')
	}
}

export {existeUsuarioById}