import categoria from '../models/categoria.js';

const existeCategoriaById = async (id) => {
    
    const existe = await categoria.findById(id);

    if(!existe) throw Error ('El ID no existe');
    
}

const existeCategoriaByNombre = async (nombre) => {
    const existe = await categoria.findOne({nombre});

    if(existe) throw Error ('Ya existe una categoria con ese nombre');
}

export {existeCategoriaById, existeCategoriaByNombre}
