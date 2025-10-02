// Funções gerais
async function enviarParaAPI(dados, endpoint) {
    try {
        const resposta = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });
        
        const resultado = await resposta.json();
        return resultado;
    } catch (erro) {
        console.log('Erro:', erro);
        return null;
    }
}

function mostrarAlerta(mensagem, tipo = 'error') {
    const alert = document.getElementById('alert');
    alert.className = tipo === 'success' ? 'alert alert-success' : 'alert';
    alert.style.display = 'block';
    alert.textContent = mensagem;
}

function limparFormulario(formId) {
    document.getElementById('alert').style.display = 'none';
    if (formId) {
        document.getElementById(formId).reset();
    }
}

// Plantio
function initPlantio() {
    const form = document.getElementById('plantio-form');
    const dataInput = document.getElementById('data_plantio');
    const hoje = new Date();
    
    if (dataInput) {
        dataInput.value = hoje.toISOString().split('T')[0];
    }
    
    carregarPlantios();
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const variedade = document.getElementById('variedade').value;
            const data = document.getElementById('data_plantio').value;
            const quantidade = document.getElementById('quantidade').value;
            const localizacao = document.getElementById('localizacao').value;
            
            if (!variedade || !data || !quantidade || !localizacao) {
                mostrarAlerta('Preencha todos os campos!');
                return;
            }
            
            const dados = {
                variedade: variedade,
                dataPlantio: data,
                quantidade: parseInt(quantidade),
                localizacao: localizacao
            };
            
            const resultado = await enviarParaAPI(dados, 'plantios');
            
            if (resultado) {
                mostrarSucessoPlantio(dados, resultado);
                carregarPlantios();
            } else {
                mostrarAlerta('Erro ao conectar com o servidor');
            }
            
            form.reset();
            if (dataInput) {
                dataInput.value = hoje.toISOString().split('T')[0];
            }
        });
    }
}

async function carregarPlantios() {
    try {
        const resposta = await fetch('http://localhost:3000/plantios');
        const plantios = await resposta.json();
        atualizarTabelaPlantios(plantios);
    } catch (erro) {
        console.log('Erro:', erro);
    }
}

function atualizarTabelaPlantios(plantios) {
    const container = document.getElementById('tabela-plantios');
    if (!container) return;
    
    if (plantios.length === 0) {
        container.innerHTML = '<div class="sem-dados">Nenhum plantio cadastrado</div>';
        return;
    }

    let html = '<table>';
    html += '<tr><th>ID</th><th>Variedade</th><th>Data</th><th>Quantidade</th><th>Localização</th></tr>';
    
    plantios.forEach(function(plantio) {
        const data = new Date(plantio.Data_Plantio).toLocaleDateString('pt-BR');
        html += '<tr>';
        html += '<td>' + (plantio.ID_Plantio || 'N/A') + '</td>';
        html += '<td>' + plantio.Variedade + '</td>';
        html += '<td>' + data + '</td>';
        html += '<td>' + plantio.Quantidade_Plantada + ' mudas</td>';
        html += '<td>' + plantio.Localizacao + '</td>';
        html += '</tr>';
    });
    
    html += '</table>';
    container.innerHTML = html;
}

function mostrarSucessoPlantio(dados, resultado) {
    const alert = document.getElementById('alert');
    const dataFormatada = new Date(dados.dataPlantio).toLocaleDateString('pt-BR');
    
    alert.className = 'alert alert-success';
    alert.style.display = 'block';
    alert.innerHTML = '<strong>Plantio cadastrado com sucesso!</strong><br><br>' +
                     '<strong>Dados enviados:</strong><br>' +
                     'Variedade: ' + dados.variedade + '<br>' +
                     'Data: ' + dataFormatada + '<br>' +
                     'Quantidade: ' + dados.quantidade + ' mudas<br>' +
                     'Localização: ' + dados.localizacao + '<br><br>' +
                     '<strong>ID no banco: ' + resultado.id + '</strong><br><br>' +
                     '<button class="btn-registrar" onclick="limparFormulario(\'plantio-form\')">Fazer novo cadastro</button>';
    
    alert.scrollIntoView({ behavior: 'smooth' });
}

// Irrigação
function initIrrigacao() {
    const form = document.getElementById('irrigacao-form');
    
    carregarIrrigacoes();
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const idPlantio = document.getElementById('id_plantio').value;
            const horarioInicial = document.getElementById('horario_inicial').value;
            const horarioFinal = document.getElementById('horario_final').value;
            
            if (!idPlantio || !horarioInicial || !horarioFinal) {
                mostrarAlerta('Preencha todos os campos!');
                return;
            }
            
            const dados = {
                idPlantio: parseInt(idPlantio),
                horarioInicial: horarioInicial,
                horarioFinal: horarioFinal
            };
            
            const resultado = await enviarParaAPI(dados, 'irrigacoes');
            
            if (resultado) {
                mostrarSucessoIrrigacao(dados, resultado);
                carregarIrrigacoes();
            } else {
                mostrarAlerta('Erro ao conectar com o servidor');
            }
            
            form.reset();
        });
    }
}

async function carregarIrrigacoes() {
    try {
        const resposta = await fetch('http://localhost:3000/irrigacoes');
        const irrigacoes = await resposta.json();
        atualizarTabelaIrrigacoes(irrigacoes);
    } catch (erro) {
        console.log('Erro:', erro);
    }
}

function atualizarTabelaIrrigacoes(irrigacoes) {
    const container = document.getElementById('tabela-irrigacoes');
    if (!container) return;
    
    if (irrigacoes.length === 0) {
        container.innerHTML = '<div class="sem-dados">Nenhuma irrigação cadastrada</div>';
        return;
    }

    let html = '<table>';
    html += '<tr><th>ID</th><th>Plantio ID</th><th>Início</th><th>Fim</th></tr>';
    
    irrigacoes.forEach(function(irrigacao) {
        html += '<tr>';
        html += '<td>' + (irrigacao.ID_Irrigacao || 'N/A') + '</td>';
        html += '<td>' + irrigacao.ID_Plantio + '</td>';
        html += '<td>' + irrigacao.Horario_Inicial + '</td>';
        html += '<td>' + irrigacao.Horario_Final + '</td>';
        html += '</tr>';
    });
    
    html += '</table>';
    container.innerHTML = html;
}

function mostrarSucessoIrrigacao(dados, resultado) {
    const alert = document.getElementById('alert');
    
    alert.className = 'alert alert-success';
    alert.style.display = 'block';
    alert.innerHTML = '<strong>Irrigação cadastrada com sucesso!</strong><br><br>' +
                     '<strong>Dados enviados:</strong><br>' +
                     'ID do Plantio: ' + dados.idPlantio + '<br>' +
                     'Horário Inicial: ' + dados.horarioInicial + '<br>' +
                     'Horário Final: ' + dados.horarioFinal + '<br><br>' +
                     '<strong>ID no banco: ' + resultado.id + '</strong><br><br>' +
                     '<button class="btn-registrar" onclick="limparFormulario(\'irrigacao-form\')">Nova Irrigação</button>';
    
    alert.scrollIntoView({ behavior: 'smooth' });
}

// Colheita
function initColheita() {
    const form = document.getElementById('colheita-form');
    const dataInput = document.getElementById('data_colheita');
    const hoje = new Date();
    
    if (dataInput) {
        dataInput.value = hoje.toISOString().split('T')[0];
    }
    
    carregarColheitas();
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const idPlantio = document.getElementById('id_plantio').value;
            const dataColheita = document.getElementById('data_colheita').value;
            const quantidade = document.getElementById('quantidade_colhida').value;
            const qualidade = document.getElementById('qualidade').value;
            
            if (!idPlantio || !dataColheita || !quantidade || !qualidade) {
                mostrarAlerta('Preencha todos os campos!');
                return;
            }
            
            const dados = {
                idPlantio: parseInt(idPlantio),
                dataColheita: dataColheita,
                quantidade: parseInt(quantidade),
                qualidade: qualidade
            };
            
            const resultado = await enviarParaAPI(dados, 'colheitas');
            
            if (resultado) {
                mostrarSucessoColheita(dados, resultado);
                carregarColheitas();
            } else {
                mostrarAlerta('Erro ao conectar com o servidor');
            }
            
            form.reset();
            if (dataInput) {
                dataInput.value = hoje.toISOString().split('T')[0];
            }
        });
    }
}

async function carregarColheitas() {
    try {
        const resposta = await fetch('http://localhost:3000/colheitas');
        const colheitas = await resposta.json();
        atualizarTabelaColheitas(colheitas);
    } catch (erro) {
        console.log('Erro:', erro);
    }
}

function atualizarTabelaColheitas(colheitas) {
    const container = document.getElementById('tabela-colheitas');
    if (!container) return;
    
    if (colheitas.length === 0) {
        container.innerHTML = '<div class="sem-dados">Nenhuma colheita cadastrada</div>';
        return;
    }

    let html = '<table>';
    html += '<tr><th>ID</th><th>Plantio ID</th><th>Data</th><th>Quantidade</th><th>Qualidade</th></tr>';
    
    colheitas.forEach(function(colheita) {
        const data = new Date(colheita.Data_Colheita).toLocaleDateString('pt-BR');
        html += '<tr>';
        html += '<td>' + (colheita.ID_Colheita || 'N/A') + '</td>';
        html += '<td>' + colheita.ID_Plantio + '</td>';
        html += '<td>' + data + '</td>';
        html += '<td>' + colheita.Quantidade_Colhida + ' kg</td>';
        html += '<td>' + colheita.Qualidade + '</td>';
        html += '</tr>';
    });
    
    html += '</table>';
    container.innerHTML = html;
}

function mostrarSucessoColheita(dados, resultado) {
    const alert = document.getElementById('alert');
    const dataFormatada = new Date(dados.dataColheita).toLocaleDateString('pt-BR');
    
    alert.className = 'alert alert-success';
    alert.style.display = 'block';
    alert.innerHTML = '<strong>Colheita cadastrada com sucesso!</strong><br><br>' +
                     '<strong>Dados enviados:</strong><br>' +
                     'ID do Plantio: ' + dados.idPlantio + '<br>' +
                     'Data: ' + dataFormatada + '<br>' +
                     'Quantidade: ' + dados.quantidade + ' kg<br>' +
                     'Qualidade: ' + dados.qualidade + '<br><br>' +
                     '<strong>ID no banco: ' + resultado.id + '</strong><br><br>' +
                     '<button class="btn-registrar" onclick="limparFormulario(\'colheita-form\')">Nova Colheita</button>';
    
    alert.scrollIntoView({ behavior: 'smooth' });
}

// Inicialização baseada na página atual
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    if (path.includes('registrar.html')) {
        initPlantio();
    } else if (path.includes('irrigacao.html')) {
        initIrrigacao();
    } else if (path.includes('colheita.html')) {
        initColheita();
    }
});