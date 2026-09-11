const usuariosModel = require('../models/usuariosModel');

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'email ou senha obrigatorio'
            });
        }

        const usuario = await usuariosModel.buscarUsuarioPorEmail(email);

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({
                mensagem: 'email ou senha incorreta'
            });
        }

        res.json({
            mensagem: 'login realizado com sucesso.',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                foto: usuario.foto
            }
        });
    } catch (erro) {
        console.error('ERRO NO LOGIN:', erro);

        res.status(500).json({
            mensagem: 'erro ao realizar login.'
        });
    }
};

module.exports = {
    login
};