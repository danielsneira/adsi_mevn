import mongoose from 'mongoose';

const personaSchema = mongoose.Schema({
	tipoPersona: {type: String, required: true, maxLength: 20}, //cliente o proveedor
	nombre: {type: String, unique: true, maxLength: 50},
	tipoDocumento: {type: String, required: true, maxLength:20},
	numDocumento: {type: Number, maxLength:20},
	direccion: {type: String, maxLength:70},
	telefono: {type: String, maxLength:15},
	email: {type: String, unique: true, maxLength: 50},
	estado: {type: Number, default: 1},
	createdAt: {type: Date, default: Date.now()}
})

export default mongoose.model('Persona', personaSchema);