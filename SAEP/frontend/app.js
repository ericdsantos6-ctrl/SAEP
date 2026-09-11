const API_URL = 'http://localhost:3000';

let usuarioLogado = null;

const login = document.getElementById('login');
const cadastro = document.getElementById('cadastro');
const sistema = document.getElementById('sistema');

const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');
const formAtividade = document.getElementById('form-atividade');

const erroLogin = document.getElementById('erro-login');
const mensagemCadastro = document.getElementById('mensagem-cadastro');
const mensagemAtividade = document.getElementById('mensagem-atividade');

const btnMostrarCadastro = document.getElementById('btn-mostrar-cadastro');
const btnVoltarLogin = document.getElementById('btn-voltar-login');
const btnLogout = document.getElementById('btn-logout');
const btnNovaAtividade = document.getElementById('btn-nova-atividade');

const formularioAtividade = document.getElementById('formulario-atividade');
const listaAtividades = document.getElementById('lista-atividades');
const usuarioNome = document.getElementById('usuario-nome');

btnMostrarCadastro.addEventListener('click', () => {
    login.classList.add('oculto');
    cadastro.classList.remove('oculto');
});

btnVoltarLogin.addEventListener('click', () => {
    cadastro.classList.add('oculto');
    login.classList.remove('oculto');
    mensagemCadastro.textContent = '';
});

formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault();

    mensagemCadastro.textContent = '';

    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;
    const senha = document.getElementById('cadastro-senha').value;
    const foto = document.getElementById('cadastro-foto').value || null;

    try {
        const resposta = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                senha,
                foto
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagemCadastro.textContent = dados.mensagem;
            return;
        }

        mensagemCadastro.style.color = '#3cff81';
        mensagemCadastro.textContent = 'Conta criada com sucesso!';

        formCadastro.reset();

        setTimeout(() => {
            cadastro.classList.add('oculto');
            login.classList.remove('oculto');
            mensagemCadastro.textContent = '';
        }, 1200);

    } catch (erro) {
        console.error(erro);
        mensagemCadastro.textContent = 'Não foi possível conectar com a API.';
    }
});

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    erroLogin.textContent = '';

    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    try {
        const resposta = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            erroLogin.textContent = dados.mensagem || 'E-mail ou senha incorretos.';
            return;
        }

        usuarioLogado = dados.usuario;

        login.classList.add('oculto');
        cadastro.classList.add('oculto');
        sistema.classList.remove('oculto');

        usuarioNome.textContent = usuarioLogado.nome;

        carregarAtividades();

    } catch (erro) {
        console.error(erro);
        erroLogin.textContent = 'Não foi possível conectar com a API.';
    }
});

btnLogout.addEventListener('click', () => {
    usuarioLogado = null;

    sistema.classList.add('oculto');
    login.classList.remove('oculto');

    formLogin.reset();
    listaAtividades.innerHTML = '';
});

btnNovaAtividade.addEventListener('click', () => {
    formularioAtividade.classList.toggle('oculto');
});

formAtividade.addEventListener('submit', async (event) => {
    event.preventDefault();

    mensagemAtividade.textContent = '';

    const dados = {
        usuario_id: usuarioLogado.id,
        titulo: document.getElementById('atividade-titulo').value,
        descricao: document.getElementById('atividade-descricao').value,
        tipo: document.getElementById('atividade-tipo').value,
        data_atividade: document.getElementById('atividade-data').value,
        horario: document.getElementById('atividade-horario').value || null,
        distancia: document.getElementById('atividade-distancia').value || null,
        duracao: document.getElementById('atividade-duracao').value || null,
        local: document.getElementById('atividade-local').value || null,
        imagem: document.getElementById('atividade-imagem').value || null
    };

    try {
        const resposta = await fetch(`${API_URL}/atividades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            mensagemAtividade.textContent = resultado.mensagem;
            return;
        }

        mensagemAtividade.style.color = '#3cff81';
        mensagemAtividade.textContent = 'Atividade publicada com sucesso!';

        formAtividade.reset();

        carregarAtividades();

        setTimeout(() => {
            mensagemAtividade.textContent = '';
            formularioAtividade.classList.add('oculto');
        }, 1000);

    } catch (erro) {
        console.error(erro);
        mensagemAtividade.textContent = 'Erro ao conectar com a API.';
    }
});

async function carregarAtividades() {
    try {
        const resposta = await fetch(`${API_URL}/atividades`);
        const atividades = await resposta.json();

        listaAtividades.innerHTML = '';

        if (atividades.length === 0) {
            listaAtividades.innerHTML = `
                <div class="sem-atividades">
                    <h3>Nenhuma atividade publicada</h3>
                    <p>Seja o primeiro a compartilhar uma atividade!</p>
                </div>
            `;
            return;
        }

        atividades.forEach(atividade => {
            const div = document.createElement('div');

            div.className = 'atividade';

            div.innerHTML = `
                ${
                    atividade.imagem
                        ? `<img src="${atividade.imagem}" class="atividade-imagem" alt="Imagem da atividade">`
                        : ''
                }

                <div class="atividade-conteudo">

                    <div class="atividade-topo">
                        <div>
                            <h3>${atividade.titulo}</h3>
                            <p class="usuario">
                                ${atividade.usuario_nome}
                            </p>
                        </div>

                        <span class="tipo">
                            ${atividade.tipo}
                        </span>
                    </div>

                    <p class="descricao">
                        ${atividade.descricao || 'Sem descrição.'}
                    </p>

                    <div class="dados-atividade">
                        <div class="dado">
                            <strong>${atividade.distancia || '-'}</strong>
                            <span>km</span>
                        </div>

                        <div class="dado">
                            <strong>${atividade.duracao || '-'}</strong>
                            <span>duração</span>
                        </div>

                        <div class="dado">
                            <strong>${atividade.horario || '-'}</strong>
                            <span>horário</span>
                        </div>
                    </div>

                    <div class="info-extra">
                        <div>
                            <strong>Data:</strong>
                            ${formatarData(atividade.data_atividade)}
                        </div>

                        <div>
                            <strong>Local:</strong>
                            ${atividade.local || 'Não informado'}
                        </div>
                    </div>

                    <div class="acoes-atividade">
                        <button onclick="curtirAtividade(${atividade.id})">
                            ❤️ Curtir
                        </button>

                        <button onclick="mostrarComentarios(${atividade.id})">
                            💬 Comentários
                        </button>
                    </div>

                    <div id="comentarios-${atividade.id}" class="comentarios"></div>

                </div>
            `;

            listaAtividades.appendChild(div);
        });

        atualizarTotalAtividades(atividades);

    } catch (erro) {
        console.error(erro);

        listaAtividades.innerHTML = `
            <div class="sem-atividades">
                <p>Erro ao carregar atividades.</p>
            </div>
        `;
    }
}

async function curtirAtividade(atividadeId) {
    if (!usuarioLogado) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id: usuarioLogado.id,
                atividade_id: atividadeId
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem);
            return;
        }

        alert('Atividade curtida!');

    } catch (erro) {
        console.error(erro);
        alert('Erro ao curtir atividade.');
    }
}

async function mostrarComentarios(atividadeId) {
    const area = document.getElementById(`comentarios-${atividadeId}`);

    if (!area) {
        return;
    }

    try {
        const resposta = await fetch(
            `${API_URL}/comentarios?atividade_id=${atividadeId}`
        );

        const comentarios = await resposta.json();

        area.innerHTML = `
            <div style="margin-top:15px;">
                <form onsubmit="enviarComentario(event, ${atividadeId})">
                    <input
                        type="text"
                        id="comentario-${atividadeId}"
                        placeholder="Escreva um comentário..."
                        required
                    >

                    <button type="submit">
                        Comentar
                    </button>
                </form>

                <div style="margin-top:15px;">
                    ${
                        comentarios.length === 0
                            ? '<p>Nenhum comentário ainda.</p>'
                            : comentarios.map(comentario => `
                                <div style="margin-top:10px;">
                                    <strong>${comentario.usuario_nome}</strong>
                                    <p>${comentario.comentario}</p>
                                </div>
                            `).join('')
                    }
                </div>
            </div>
        `;

    } catch (erro) {
        console.error(erro);
        area.innerHTML = '<p>Erro ao carregar comentários.</p>';
    }
}

async function enviarComentario(event, atividadeId) {
    event.preventDefault();

    const input = document.getElementById(
        `comentario-${atividadeId}`
    );

    const comentario = input.value.trim();

    if (!comentario) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id: usuarioLogado.id,
                atividade_id: atividadeId,
                comentario
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.mensagem);
            return;
        }

        mostrarComentarios(atividadeId);

    } catch (erro) {
        console.error(erro);
        alert('Erro ao enviar comentário.');
    }
}

function formatarData(data) {
    if (!data) {
        return 'Não informada';
    }

    const dataFormatada = new Date(data);

    return dataFormatada.toLocaleDateString('pt-BR');
}

function atualizarTotalAtividades(atividades) {
    const total = document.getElementById('total-atividades');

    if (total) {
        total.textContent = atividades.length;
    }
}