import mongoose from "mongoose";

const compraSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Persona",
    required: true,
  },
  tipoComprobante: { type: String, required: true, maxLength: 20 }, //Factura, Nota Debito o Credito
  serieComprobante: { type: String, required: true, maxLength: 7 },
  numComprobante: { type: String, required: true, maxLength: 10 },
  impuesto: { type: Number, required: true, maxLength: 10 },
  total: { type: Number, required: true },
  detalles: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Articulo" },
      articulo: { type: String, maxLength: 50 },
      cantidad: { type: Number, maxLength: 10 },
      precio: { type: Number, maxLength: 20 },
      descuento: { type: Number, maxLength: 10 },
    },
  ],
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Compra", compraSchema);
