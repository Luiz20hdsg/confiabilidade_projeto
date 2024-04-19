
const express = require('express');
const Icon = require('./iconModel');
const router = express.Router();

// Rota para obter todos os ícones
router.get('/icons', async (req, res) => {
  try {
    const icons = await Icon.find();
    res.json(icons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para adicionar um novo ícone
router.post('/icons', async (req, res) => {
  const icon = new Icon({
    nome: req.body.nome,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    descricao: req.body.descricao,
    visivelPara: req.body.visivelPara
  });

  try {
    const novoIcone = await icon.save();
    res.status(201).json(novoIcone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mais rotas para atualizar e excluir ícones...

module.exports = router;
