const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/seu_banco_de_dados', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

module.exports = mongoose;