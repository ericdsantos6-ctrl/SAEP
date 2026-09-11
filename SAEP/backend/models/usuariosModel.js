const db = require('../database');

const buscarUsuarioPorEmail = async (email) => {
    const [resultado] = await db.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );

    return resultado[0];
};

const criarUsuario = async (nome, email, senha, foto = null) => {
    const [resultado] = await db.query(
        'INSERT INTO usuarios (nome, email, senha, foto) VALUES (?, ?, ?, ?)',
        [nome, email, senha, foto]
    );

    return resultado.insertId;
};

const listarUsuarios = async () => {
    const [resultado] = await db.query(
        'SELECT id, nome, email, foto, criado_em FROM usuarios'
    );

    return resultado;
};

module.exports = {
    buscarUsuarioPorEmail,
    criarUsuario,
    listarUsuarios
};