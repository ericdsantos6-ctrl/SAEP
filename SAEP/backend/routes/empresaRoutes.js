const express = require('express');
const empresaController = require('../controllers/empresaController');

const router = express.Router();

router.post('/', empresaController.criarEmpresa);
router.get('/', empresaController.listarEmpresas);

module.exports = router;