import Venta from "../models/venta.js";
import { activarVenta, desactivarVenta, quitarArticulos } from "../helpers/ingresos.js";

const ventaControllers = {
  ventaPost: async (req, res) => {
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
    const venta = new Venta({
      usuario,
      persona,
      tipoComprobante,
      serieComprobante,
      numComprobante,
      impuesto,
      total,
      detalles,
    });

    detalles.forEach(async (itemVenta) => {
      quitarArticulos(itemVenta._id, itemVenta.cantidad);
    });

    await venta.save();

    res.json({
      venta,
    });
  },
  ventaGet: async (req, res) => {
    const value = req.query.value;
    const venta = await Venta
    .find({
      $or: [{ nombre: new RegExp(value, "i") }, { numComprobante: new RegExp(value, "i") }],
    })
    .populate('usuario', 'nombre')
    .populate('persona', 'nombre')

    res.json({
      venta,
    });
  },
  ventaGetById: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findOne({ _id: id });

    res.json({
      venta,
    });
  },
  
  ventaPutActivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, { estado: 1 });

    activarVenta(venta._id)

    res.json({
      venta: 'activado',
    });
  },
  ventaPutDesactivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, { estado: 0 });

    desactivarVenta(venta._id)

    res.json({
      venta: 'desactivado',

    });
  },
};

export default ventaControllers;
