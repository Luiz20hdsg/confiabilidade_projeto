
const express = require('express');
const Icon = require('./iconModel');
const router = express.Router();

// Rota para criar um novo ícone
router.post('/icons', async (req, res) => {
  const { nome, latitude, longitude, descricao, visivelPara } = req.body;
  const novoIcone = new Icon({
    nome,
    latitude,
    longitude,
    descricao,
    visivelPara
  });

  try {
    const iconCriado = await novoIcone.save();
    res.status(201).json(iconCriado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Rota para buscar todos os ícones
router.get('/icons', async (req, res) => {
    try {
      const icons = await Icon.find();
      res.json(icons);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Rota para buscar um ícone específico pelo ID
  router.get('/icons/:id', getIcon, (req, res) => {
    res.json(res.icon);
  });
  
  // Middleware para buscar um ícone pelo ID
  async function getIcon(req, res, next) {
    let icon;
    try {
      icon = await Icon.findById(req.params.id);
      if (icon == null) {
        return res.status(404).json({ message: 'Ícone não encontrado' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.icon = icon;
    next();
  }


// Rota para atualizar um ícone pelo ID
router.patch('/icons/:id', getIcon, async (req, res) => {
    if (req.body.nome != null) {
      res.icon.nome = req.body.nome;
    }
    if (req.body.latitude != null) {
      res.icon.latitude = req.body.latitude;
    }
    if (req.body.longitude != null) {
      res.icon.longitude = req.body.longitude;
    }
    if (req.body.descricao != null) {
      res.icon.descricao = req.body.descricao;
    }
    if (req.body.visivelPara != null) {
      res.icon.visivelPara = req.body.visivelPara;
    }
  
    try {
      const iconAtualizado = await res.icon.save();
      res.json(iconAtualizado);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// Rota para excluir um ícone pelo ID
router.delete('/icons/:id', getIcon, async (req, res) => {
    try {
      await res.icon.remove();
      res.json({ message: 'Ícone deletado' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
