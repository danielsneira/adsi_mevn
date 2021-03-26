import Articulo from '../models/articulo.js'

const articuloControllers = {
    articuloGet: async (req, res) => {
        const articulo = await Articulo
            .find()
            .populate('Categoria', 'nombre')
        res.json({
            articulo
        })
    },
    articuloGetById: async (req, res) => {
        const { id } = req.params;
        const articulo = await Articulo
            .findOne({ _id: id });

        res.json({
            articulo
        })
    },
    articuloPost: async (req, res) => {
        const { categoria, codigo, nombre, descripcion, precioVenta, stock } = req.body;
        const articulo = new Articulo({ categoria, codigo, nombre, descripcion, precioVenta, stock });

        await articulo.save();

        res.json({
            articulo
        })
    },
    articuloPut: async (req, res) => {
        const { id } = req.params;
        const { _id, estado, createdAt, __v, ...resto} = req.body;

        const articulo = await Articulo.findByIdAndUpdate(id, resto);

        res.json({
            articulo
        })
    },
    articuloPutActivar: async (req, res) => {
        const { id } = req.params;
        await Articulo.findByIdAndUpdate(id, {estado: 1});

        res.json({
            "articulo": 'activado'
        })
    },
    articuloPutDesactivar: async (req, res) => {
        const { id } = req.params;
        await Articulo.findByIdAndUpdate(id, {estado: 0});

        res.json({
            "articulo": 'desactivado'
        })
    },
    articuloDelete: async (req, res) => {
        const { id } = req.params;
            
        await Articulo.findByIdAndDelete(id);

        res.json({
            "status": "deleted"
        })
    }
}


export default articuloControllers; 
