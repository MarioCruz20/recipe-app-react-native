const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//servidor http
const app = express();
//configuracion al servidor http
app.use(bodyParser.json());
app.use(cors());

//conexion a la base de dato
mongoose.connect('mongodb://localhost:27017/sistema-clinica')

.then(()=> console.log("Conexion a MongoDB exitosa"))

.catch(err =>console.error("Error al conectar a MongoDB", err));

//Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//configurar puerto para backend
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});
