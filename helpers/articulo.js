import articulo from '../models/articulo.js';

const existeArticuloById = async (id) => {
    
    const existe = await articulo.findById(id);

    if(!existe) throw Error ('El ID no existe');
    
}

export {existeArticuloById}