import mongoose from 'mongoose';

const usuarioSchema = mongoose.Schema({
	nombre: {type: String, required: true, maxLength: 50},
	email: {type: String, unique: true, maxLength: 50},
	password: {type: String, required: true},
	rol: {type: String, required: true, maxLength: 20}, //Admin, vendedor, almacenista
	estado: {type: Number, default: 1},
	createdAt: {type: Date, default: Date.now()}
})

export default mongoose.model('Usuario', usuarioSchema);