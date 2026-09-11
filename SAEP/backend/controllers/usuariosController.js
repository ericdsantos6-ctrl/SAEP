const usuariosModel = require('../models/usuariosModel');

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, foto } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'todos os campos obrigatorios devem ser preenchidos.'
            });
        }

        const usuario = await usuariosModel.buscarUsuarioPorEmail(email);

        if (usuario) {
            return res.status(409).json({
                mensagem: 'este email ja esta cadastrado.'
            });
        }

        await usuariosModel.criarUsuario(nome, email, senha, foto);

        res.status(201).json({
            mensagem: 'usuario cadastrado com sucesso.'
        });
    } catch (erro) {
    console.error(erro);

    res.status(500).json({
        mensagem: 'erro ao cadastrar usuario.'
    });
}
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.listarUsuarios();

        res.json(usuarios);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'erro ao listar usuarios.'
        });
    }
};

module.exports = {
    criarUsuario,
    listarUsuarios
};