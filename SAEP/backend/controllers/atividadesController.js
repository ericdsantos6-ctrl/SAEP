const atividadesModel = require('../models/atividadesModel');

const criarAtividade = async (req, res) => {
    try {
        const {
            usuario_id,
            titulo,
            descricao,
            tipo,
            data_atividade,
            horario,
            distancia,
            duracao,
            calorias,
            local,
            imagem
        } = req.body;

        if (!usuario_id || !titulo || !tipo || !data_atividade) {
            return res.status(400).json({
                mensagem: 'usuario_id, titulo, tipo e data_atividade sao obrigatorios.'
            });
        }

        const tiposPermitidos = ['corrida', 'caminhada', 'trilha'];

        if (!tiposPermitidos.includes(tipo)) {
            return res.status(400).json({
                mensagem: 'tipo de atividade invalido.'
            });
        }

        const id = await atividadesModel.criarAtividade(
            usuario_id,
            titulo,
            descricao,
            tipo,
            data_atividade,
            horario,
            distancia,
            duracao,
            calorias,
            local,
            imagem
        );

        res.status(201).json({
            mensagem: 'atividade cadastrada com sucesso.',
            id
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao cadastrar atividade.'
        });
    }
};

const listarAtividades = async (req, res) => {
    try {
        const atividades = await atividadesModel.listarAtividades();

        res.json(atividades);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao listar atividades.'
        });
    }
};

module.exports = {
    criarAtividade,
    listarAtividades
};