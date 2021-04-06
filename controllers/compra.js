import Compra from "../models/compra.js";
import { activarCompra, añadirArticulos, desactivarCompra } from "../helpers/ingresos.js"

const compraControllers = {
  compraPost: async (req, res) => {
    const {
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      impuesto,
      total,
      detalles,
    } = req.body;
    const compra = new Compra({
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      impuesto,
      total,
      detalles,
    });

    detalles.forEach(async (itemCompra) => {
        añadirArticulos(itemCompra._id, itemCompra.cantidad);
    });

    await compra.save();

    res.json({
      compra,
    });
  },

  compraGet: async (req, res) => {
    const value = req.query.value;
    const compra = await Compra
    .find({
      $or: [
        { nombre: new RegExp(value, "i") },
        { numComprobante: new RegExp(value, "i") },
      ],
    })
    .populate('usuario', 'nombre')
    .populate('persona', 'nombre')

    res.json({
      compra,
    });
  },
  compraGetById: async (req, res) => {
    const { _id } = req.params;
    const compra = await Compra.findOne(_id);

    res.json({
      compra,
    });
  },
  
  compraPutActivar: async (req, res) => {
    const { id } = req.params;
    const compra = await Compra.findByIdAndUpdate(id, { estado: 1 });

    activarCompra(compra._id);

    res.json({
        compra: 'activado',
    });
  },

  compraPutDesactivar: async (req, res) => {
    const { id } = req.params;
    const compra = await Compra.findByIdAndUpdate(id, { estado: 0 });

    desactivarCompra(compra._id);

    res.json({
      compra: 'desactivado',
    });
  },
};

export default compraControllers;
