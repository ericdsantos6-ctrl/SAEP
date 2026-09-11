const express = require('express');
const comentariosController = require('../controllers/comentariosController');

const router = express.Router();

router.post('/', comentariosController.criarComentario);
router.get('/', comentariosController.listarComentarios);

module.exports = router;