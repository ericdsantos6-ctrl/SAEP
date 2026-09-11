const likesModel = require('../models/likesModel');

const criarLike = async (req, res) => {
    try {
        const { usuario_id, atividade_id } = req.body;

        if (!usuario_id || !atividade_id) {
            return res.status(400).json({
                mensagem: 'usuario_id e atividade_id sao obrigatorios.'
            });
        }

        const likeExistente = await likesModel.buscarLike(
            usuario_id,
            atividade_id
        );

        if (likeExistente) {
            return res.status(409).json({
                mensagem: 'usuario ja curtiu esta atividade.'
            });
        }

        await likesModel.criarLike(usuario_id, atividade_id);

        res.status(201).json({
            mensagem: 'atividade curtida com sucesso.'
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao curtir atividade.'
        });
    }
};

const removerLike = async (req, res) => {
    try {
        const { usuario_id, atividade_id } = req.body;

        if (!usuario_id || !atividade_id) {
            return res.status(400).json({
                mensagem: 'usuario_id e atividade_id sao obrigatorios.'
            });
        }

        await likesModel.removerLike(usuario_id, atividade_id);

        res.json({
            mensagem: 'like removido com sucesso.'
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao remover like.'
        });
    }
};

const listarLikes = async (req, res) => {
    try {
        const likes = await likesModel.listarLikes();

        res.json(likes);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao listar likes.'
        });
    }
};

module.exports = {
    criarLike,
    removerLike,
    listarLikes
};