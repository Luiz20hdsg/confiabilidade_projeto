
const mongoose = require('./db');

const iconSchema = new mongoose.Schema({
  nome: String,
  latitude: Number,
  longitude: Number,
  descricao: String,
  visivelPara: [String] // Lista de usuários que podem visualizar o ícone
});

const Icon = mongoose.model('Icon', iconSchema);

module.exports = Icon;
