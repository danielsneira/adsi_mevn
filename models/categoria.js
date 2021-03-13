import mongoose from 'mongoose';

const categoriaSchema = mongoose.Schema({
	nombre: {type: String, required: true, maxLength: 50, unique: true},
	descripcion: {type: String, required: false, maxLength: 255, unique: false},
	estado: {type: Number, default: 1},
	createdAt: {type: Date, default: Date.now()}
})

export default mongoose.model('Categoria', categoriaSchema);
