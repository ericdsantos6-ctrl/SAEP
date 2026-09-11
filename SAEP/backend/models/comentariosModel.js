const db = require('../database');

const criarComentario = async (
    usuario_id,
    atividade_id,
    comentario
) => {
    const [resultado] = await db.query(
        `insert into comentarios
        (usuario_id, atividade_id, comentario)
        values (?, ?, ?)`,
        [usuario_id, atividade_id, comentario]
    );

    return resultado.insertId;
};

const listarComentarios = async (atividade_id) => {
    let sql = `
        select
            c.id,
            c.usuario_id,
            u.nome as usuario_nome,
            c.atividade_id,
            c.comentario,
            c.criado_em
        from comentarios c
        inner join usuarios u on u.id = c.usuario_id
    `;

    const valores = [];

    if (atividade_id) {
        sql += ' where c.atividade_id = ?';
        valores.push(atividade_id);
    }

    sql += ' order by c.criado_em desc';

    const [resultado] = await db.query(sql, valores);

    return resultado;
};

module.exports = {
    criarComentario,
    listarComentarios
};