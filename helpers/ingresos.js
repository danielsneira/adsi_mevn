import Articulo from "../models/articulo.js";
import Compra from "../models/compra.js";
import Venta from "../models/venta.js";

const quitarArticulos = async (_id, cantidad) => {
  let articulo = await Articulo.findById(_id);
  let stock = parseInt(articulo.stock) - parseInt(cantidad);
  await articulo.updateOne({ stock });
};

const añadirArticulos = async (_id, cantidad) => {
  let articulo = await Articulo.findById(_id);
  let stock = parseInt(articulo.stock) + parseInt(cantidad);
  await articulo.updateOne({ stock });
};

const activarCompra = async (_id) => {
  let {detalles} = await Compra.findById(_id);
  detalles.forEach((itemCompra) => {
    añadirArticulos(itemCompra._id, itemCompra.cantidad);
  });
};

const desactivarCompra = async (_id) => {
  let {detalles} = await Compra.findById(_id);
  detalles.forEach((itemCompra) => {
    quitarArticulos(itemCompra._id, itemCompra.cantidad);
  });
};

const activarVenta = async (_id) => {
  let {detalles} = await Venta.findById(_id);
	detalles.forEach((itemVenta) => {
    quitarArticulos(itemVenta._id, itemVenta.cantidad);
  });
};

const desactivarVenta = async (_id) => {
  let {detalles} = await Venta.findById(_id);
  detalles.forEach((itemVenta) => {
    añadirArticulos(itemVenta._id, itemVenta.cantidad);
  });
};

export {
  añadirArticulos,
  activarCompra,
  desactivarCompra,
  quitarArticulos,
  activarVenta,
  desactivarVenta,
};
