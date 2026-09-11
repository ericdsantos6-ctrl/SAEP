const express = require('express');
const usuariosController = require('../controllers/usuariosController');

const router = express.Router();

router.post('/', usuariosController.criarUsuario);
router.get('/', usuariosController.listarUsuarios);

module.exports = router;