const db = require('../database');

const criarEmpresa = async (
    nome,
    descricao,
    email,
    telefone,
    endereco
) => {
    const [resultado] = await db.query(
        `insert into empresa
        (nome, descricao, email, telefone, endereco)
        values (?, ?, ?, ?, ?)`,
        [nome, descricao, email, telefone, endereco]
    );

    return resultado.insertId;
};

const listarEmpresas = async () => {
    const [resultado] = await db.query(`
        select
            id,
            nome,
            descricao,
            email,
            telefone,
            endereco
        from empresa
        order by id desc
    `);

    return resultado;
};

module.exports = {
    criarEmpresa,
    listarEmpresas
};