
const express = require('express');
const app = express();
const cors = require('cors');
const iconRoutes = require('./iconRoutes');

app.use(cors());
app.use(express.json());

// Rota padrão para a raiz do servidor
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor!');
});

app.use('/api', iconRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

