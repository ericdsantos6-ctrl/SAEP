const comentariosModel = require('../models/comentariosModel');

const criarComentario = async (req, res) => {
    try {
        const { usuario_id, atividade_id, comentario } = req.body;

        if (!usuario_id || !atividade_id || !comentario || comentario.trim().length < 3) {
            return res.status(400).json({
                mensagem: 'o comentario deve ter pelo menos 3 caracteres.'
            });
        }

        const id = await comentariosModel.criarComentario(
            usuario_id,
            atividade_id,
            comentario.trim()
        );

        res.status(201).json({
            mensagem: 'comentario criado com sucesso.',
            id
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao criar comentario.'
        });
    }
};

const listarComentarios = async (req, res) => {
    try {
        const { atividade_id } = req.query;

        const comentarios = await comentariosModel.listarComentarios(
            atividade_id
        );

        res.json(comentarios);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao listar comentarios.'
        });
    }
};

module.exports = {
    criarComentario,
    listarComentarios
};