import Compra from '../models/compra.js'

const compraControllers = {
    compraPost: async (req, res) => {
        const { usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles:[{id, articulo, cantidad, precio}] } = req.body;
        const compra = new compra({ usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles:[{id, articulo, cantidad, precio}] });

        await Compra.save();

        res.json({
            compra
        })
    },
    compraGet: async (req, res) => {
        const value = req.query.value;
        const compra = await Compra
            .find({
                $or: [
                { nombre: new RegExp(value, 'i') },
                { descripcion: new RegExp(value, 'i') }
            ],
        });

        res.json({
            compra
        })
    },
    compraGetById: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra
            .findOne({ _id: id });

        res.json({
            compra
        })
    },
    compraPut: async (req, res) => {
        const { id } = req.params;
        const { _id, estado, createdAt, __v, ...resto} = req.body;

        const compra = await Compra.findByIdAndUpdate(id, resto);

        res.json({
            compra
        })
    },
    compraPutActivar: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra.findByIdAndUpdate(id, {estado: 1});

        res.json({
            "compra": compra.estado
        })
    },
    compraPutDesactivar: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra.findByIdAndUpdate(id, {estado: 0});

        res.json({
            "compra": compra.estado
        })
    },
    compraDelete: async (req, res) => {
        const { id } = req.params;
            
        const compra = await Compra.findByIdAndDelete(id);

        res.json({
            "status": "deleted"
        })
    }
}


export default compraControllers; 
