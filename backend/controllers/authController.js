const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const login = async (req, res) => {
    try {
        const { nombreUsuario, contrasenha } = req.body;
        const usuario = await Usuario.findOne({ nombreUsuario });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const esCoincidente = await bcrypt.compare(contrasenha, usuario.contrasenha);
        if (!esCoincidente) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' }); 
        }

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            'claveSecreta',
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error en el servidor (backend)',
            error: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const { nombreUsuario, contrasenha, rol } = req.body;

        // verificar si ya existe
        const usuarioExistente = await Usuario.findOne({ nombreUsuario });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // hashear contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasenha, salt);

        const nuevoUsuario = new Usuario({
            nombreUsuario,
            contrasenha: hashedPassword,
            rol
        });

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error en el servidor (backend)',
            error: error.message
        });
    }
};

module.exports = { login, register };
