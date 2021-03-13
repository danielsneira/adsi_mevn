import jwt from 'jsonwebtoken'
import { existeUsuarioById } from '../helpers/usuario.js';

const generarJWT = (uid='') => {
	return new Promise((resolve, reject) => {
//		checkToken()
		const payload = {uid}
		jwt.sign(payload, process.env.Secretprivatekey,{
			expiresIn:'7d'	
		},(err,token)=>{
			if(err){
				reject('no se pudo generar el token')
			} else {
				resolve(token)
			}
		})
	})

}

const validarJWT = async(req, res) => {
	const token = req.header('token')
	if (!token){
		return res.status(401).json({
			msg: 'No hay token en la peticion'
		})
	}
	
	try {
		const {uid} = jwt.verify(token, process.evn.secretprivatekey);
		const usuario = await Usuario.findById(uid)
		if(!usuario){
			return res.status(401).json({
				msg: 'token no valido'
			})
		}
		
		if(usuario.estado === 0){
			return res.status(401).json({
				msg: 'token no valido'
			})
		}
		
		req.usuario = usuario;
		
	}	catch(err) {
		
	
	}
	
}

async function checkToken(token) {
	let __id = null;
	
	try {
		const {id} = await jwt.decode(token)
	} catch (err) {
		return false;
	}
	
	const existeUsuario = existeUsuarioById(__id)

	
}

export {generarJWT}