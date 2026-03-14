const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    contrasenha: { type: String, required: true },
    rol: { type: String, required: true }//admin o user
});


usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contrasenha')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.contrasenha = await bcrypt.hash(this.contrasenha, salt);
    return next();
});


module.exports = mongoose.model('Usuario', usuarioSchema);
