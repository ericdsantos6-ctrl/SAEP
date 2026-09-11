const db = require('../database');

const criarAtividade = async (
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
    imagem = null
) => {
    const [resultado] = await db.query(
        `insert into atividades
        (usuario_id, titulo, descricao, tipo, data_atividade, horario, distancia, duracao, calorias, local, imagem)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
    );

    return resultado.insertId;
};

const listarAtividades = async () => {
    const [resultado] = await db.query(`
        select
            a.id,
            a.usuario_id,
            u.nome as usuario_nome,
            u.foto as usuario_foto,
            a.titulo,
            a.descricao,
            a.tipo,
            a.data_atividade,
            a.horario,
            a.distancia,
            a.duracao,
            a.calorias,
            a.local,
            a.imagem,
            a.criado_em
        from atividades a
        inner join usuarios u on u.id = a.usuario_id
        order by a.criado_em desc
    `);

    return resultado;
};

module.exports = {
    criarAtividade,
    listarAtividades
};