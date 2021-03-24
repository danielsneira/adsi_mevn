import Venta from '../models/venta.js'

const ventaControllers = {
    ventaPost: async (req, res) => {
        const { usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles:[{id, articulo, cantidad, precio}] } = req.body;
        const venta = new Venta({ usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles:[{id, articulo, cantidad, precio}]  });

        await venta.save();

        res.json({
            venta
        })
    },
    ventaGet: async (req, res) => {
        const value = req.query.value;
        const venta = await Venta
            .find({
                $or: [
                { nombre: new RegExp(value, 'i') },
                { descripcion: new RegExp(value, 'i') }
            ],
        });

        res.json({
            venta
        })
    },
    ventaGetById: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta
            .findOne({ _id: id });

        res.json({
            venta
        })
    },
    ventaPut: async (req, res) => {
        const { id } = req.params;
        const { _id, estado, createdAt, __v, ...resto} = req.body;

        const venta = await Venta.findByIdAndUpdate(id, resto);

        res.json({
            venta
        })
    },
    ventaPutActivar: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta.findByIdAndUpdate(id, {estado: 1});

        res.json({
            "venta": venta.estado
        })
    },
    ventaPutDesactivar: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta.findByIdAndUpdate(id, {estado: 0});

        res.json({
            "venta": venta.estado
        })
    },
    ventaDelete: async (req, res) => {
        const { id } = req.params;
            
        const venta = await Venta.findByIdAndDelete(id);

        res.json({
            "status": "deleted"
        })
    }
}


export default ventaControllers; 
