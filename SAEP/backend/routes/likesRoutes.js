const express = require('express');
const likesController = require('../controllers/likesController');

const router = express.Router();

router.post('/', likesController.criarLike);
router.delete('/', likesController.removerLike);
router.get('/', likesController.listarLikes);

module.exports = router;