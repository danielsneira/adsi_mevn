const existeUsuarioById = async(id) => {
	const existe = await Usuario.findById(id)
	
	if(!existe){
		throw new Error('el id no existe')
	}
}

export {existeUsuarioById}