const db = require('../database');

const buscarLike = async (usuario_id, atividade_id) => {
    const [resultado] = await db.query(
        'select * from likes where usuario_id = ? and atividade_id = ?',
        [usuario_id, atividade_id]
    );

    return resultado[0];
};

const criarLike = async (usuario_id, atividade_id) => {
    const [resultado] = await db.query(
        'insert into likes (usuario_id, atividade_id) values (?, ?)',
        [usuario_id, atividade_id]
    );

    return resultado.insertId;
};

const removerLike = async (usuario_id, atividade_id) => {
    await db.query(
        'delete from likes where usuario_id = ? and atividade_id = ?',
        [usuario_id, atividade_id]
    );
};

const listarLikes = async () => {
    const [resultado] = await db.query(`
        select
            l.id,
            l.usuario_id,
            u.nome as usuario_nome,
            l.atividade_id,
            l.criado_em
        from likes l
        inner join usuarios u on u.id = l.usuario_id
        order by l.criado_em desc
    `);

    return resultado;
};

module.exports = {
    buscarLike,
    criarLike,
    removerLike,
    listarLikes
};