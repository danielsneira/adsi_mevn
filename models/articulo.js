import mongoose from 'mongoose';

const articuloSchema = mongoose.Schema({
	categoria : {type: mongoose.Schema.Types.ObjectId, ref:'Categoria', required: true},
	codigo: {type: Number, required: true, maxLength: 64},
	nombre: {type: String, required: true, maxLength: 50},
	descripcion: {type: String, maxLength: 255},
	precioVenta: {type: Number, default:0, required: true},
	stock: {type: Number, default:1, required: true},
	estado: {type: Number, default: 1},
	createdAt: {type: Date, default: Date.now()}
})

export default mongoose.model('Articulo', articuloSchema);