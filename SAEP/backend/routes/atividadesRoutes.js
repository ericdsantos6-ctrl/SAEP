const express = require('express');
const atividadesController = require('../controllers/atividadesController');

const router = express.Router();

router.post('/', atividadesController.criarAtividade);
router.get('/', atividadesController.listarAtividades);

module.exports = router;