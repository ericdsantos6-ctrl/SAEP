const express = require('express');
const cors = require('cors');
const db = require('./database');

const usuariosRoutes = require('./routes/usuariosRoutes');
const atividadesRoutes = require('./routes/atividadesRoutes');
const loginRoutes = require('./routes/loginRoutes');
const likesRoutes = require('./routes/likesRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const empresaRoutes = require('./routes/empresaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API SAEP Saúde funcionando!'
    });
});

app.get('/teste-banco', async (req, res) => {
    try {
        const [resultado] = await db.query(
            'SELECT 1 AS conectado'
        );

        res.json({
            mensagem: 'Conexão com MySQL funcionando!',
            resultado
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao conectar com o banco de dados.'
        });
    }
});

app.use('/usuarios', usuariosRoutes);
app.use('/atividades', atividadesRoutes);
app.use('/login', loginRoutes);
app.use('/likes', likesRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/empresa', empresaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});