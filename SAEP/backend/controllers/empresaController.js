const empresaModel = require('../models/empresaModel');

const criarEmpresa = async (req, res) => {
    try {
        const {
            nome,
            descricao,
            email,
            telefone,
            endereco
        } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: 'o nome da empresa e obrigatorio.'
            });
        }

        const id = await empresaModel.criarEmpresa(
            nome,
            descricao,
            email,
            telefone,
            endereco
        );

        res.status(201).json({
            mensagem: 'empresa cadastrada com sucesso.',
            id
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao cadastrar empresa.'
        });
    }
};

const listarEmpresas = async (req, res) => {
    try {
        const empresas = await empresaModel.listarEmpresas();

        res.json(empresas);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao listar empresas.'
        });
    }
};

module.exports = {
    criarEmpresa,
    listarEmpresas
};