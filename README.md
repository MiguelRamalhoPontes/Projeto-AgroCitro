# AgroCitro - Sistema de Gestão Agrícola

## Grupo
- Miguel Ramalho Pontes
- Kaio Vinicius Ramos do Nascimento 
- Thierry Vinicius de Souza Farias
- Emanuel Ferreti Silva

## Estrutura do Projeto

```
AgroCitro/
├── index.html
├── registrar.html
├── irrigacao.html
├── colheita.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── servidor/
│   ├── server.js
│   └── repositorio/
│       └── bancoDados.js
├── database/
│   └── backup_agricultura.sql
├── package.json
└── README.md
```

## Configuração do Ambiente

### Pré-requisitos
- Node.js versão 14 ou superior
- MySQL versão 5.7 ou superior
- HeidiSQL ou outra ferramenta de gerenciamento de banco de dados
- Navegador web moderno

### Instalação de Dependências

Execute o seguinte comando na raiz do projeto para instalar todas as dependências necessárias:

```bash
npm install express cors mysql2
```

### Configuração do Banco de Dados

1. Abra o HeidiSQL e conecte-se ao servidor MySQL
2. Crie um novo banco de dados chamado `agricultura`:

```sql
CREATE DATABASE agricultura;
```

3. Execute os seguintes scripts para criar as tabelas:

```sql
CREATE TABLE Plantio (
    ID_Plantio INT AUTO_INCREMENT PRIMARY KEY,
    Variedade VARCHAR(50) NOT NULL,
    Data_Plantio DATE NOT NULL,
    Quantidade_Plantada INT NOT NULL,
    Localizacao VARCHAR(100) NOT NULL
);

CREATE TABLE Irrigacao (
    ID_Irrigacao INT AUTO_INCREMENT PRIMARY KEY,
    ID_Plantio INT NOT NULL,
    Horario_Inicial TIME NOT NULL,
    Horario_Final TIME NOT NULL,
    FOREIGN KEY (ID_Plantio) REFERENCES Plantio(ID_Plantio)
);

CREATE TABLE Colheita (
    ID_Colheita INT AUTO_INCREMENT PRIMARY KEY,
    ID_Plantio INT NOT NULL,
    Data_Colheita DATE NOT NULL,
    Quantidade_Colhida INT NOT NULL,
    Qualidade VARCHAR(20) NOT NULL,
    FOREIGN KEY (ID_Plantio) REFERENCES Plantio(ID_Plantio)
);
```

### Configuração das Variáveis de Ambiente

Edite o arquivo `servidor/repositorio/bancoDados.js` e configure as credenciais do banco de dados:

```javascript
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "sua_senha_aqui",
    database: "agricultura",
    port: 3306
});
```

Substitua `"sua_senha_aqui"` pela senha do seu usuário MySQL.

## Execução do Projeto

### Inicialização do Servidor

Execute o seguinte comando para iniciar o servidor:

```bash
node servidor/server.js
```

A saída esperada no console deve ser:
```
Servidor da AgroCitro rodando na porta 3000
```

### Acesso à Aplicação

Abra o navegador e acesse os seguintes endereços:

- Página principal: http://localhost:3000/index.html
- Registrar plantios: http://localhost:3000/registrar.html
- Registrar irrigações: http://localhost:3000/irrigacao.html
- Registrar colheitas: http://localhost:3000/colheita.html

## Testes e Validação

### Teste de Conexão com o Banco de Dados

1. Verifique se o servidor está rodando sem erros
2. Confirme no console que a mensagem de inicialização foi exibida
3. Verifique no HeidiSQL se as tabelas foram criadas corretamente

### Teste de Funcionalidades

#### Teste de Registro de Plantio

1. Acesse http://localhost:3000/registrar.html
2. Preencha todos os campos do formulário:
   - Selecione uma variedade de laranja
   - Informe uma data válida
   - Digite uma quantidade numérica
   - Informe uma localização
3. Clique em "Registrar no Banco de Dados"
4. Verifique se a mensagem de sucesso é exibida
5. Confirme se o novo registro aparece na tabela abaixo

#### Teste de Registro de Irrigação

1. Acesse http://localhost:3000/irrigacao.html
2. Preencha o formulário com:
   - ID de um plantio existente
   - Horário inicial e final
3. Clique em registrar
4. Valide a exibição do registro na tabela

#### Teste de Registro de Colheita

1. Acesse http://localhost:3000/colheita.html
2. Preencha todos os campos:
   - ID de plantio existente
   - Data da colheita
   - Quantidade em kg
   - Qualidade da produção
3. Execute o registro
4. Verifique a atualização da tabela de colheitas

### Validação de Dados no Banco

1. Abra o HeidiSQL
2. Conecte-se ao banco `agricultura`
3. Execute consultas para verificar os dados:

```sql
SELECT * FROM Plantio;
SELECT * FROM Irrigacao;
SELECT * FROM Colheita;
```

### Teste de Validação de Formulários

1. Tente enviar formulários vazios
2. Verifique se as mensagens de erro são exibidas
3. Teste com dados inválidos (datas futuras, números negativos)
4. Confirme que a validação do frontend está funcionando

### Teste de Navegação

1. Navegue entre todas as páginas usando os botões
2. Verifique se os links estão funcionando corretamente
3. Teste o botão "Voltar para Início" em todas as páginas

## Backup do Banco de Dados

O backup do banco de dados está localizado em `database/backup_agricultura.sql` e contém:

- Estrutura completa das tabelas
- Dados de exemplo para teste
- Relacionamentos e constraints

Para restaurar o backup:

```bash
mysql -u root -p agricultura < database/backup_agricultura.sql
```

## Scripts de Inicialização

### package.json
```json
{
  "name": "agrocitro",
  "version": "1.0.0",
  "description": "Sistema de gestão agrícola para citricultura",
  "main": "servidor/server.js",
  "scripts": {
    "start": "node servidor/server.js",
    "dev": "node servidor/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mysql2": "^3.6.0"
  },
  "keywords": ["agricultura", "citricultura", "gestão"],
  "author": "Grupo AgroCitro",
  "license": "MIT"
}
```

## Solução de Problemas Comuns

### Erro de Conexão com o Banco

- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo de configuração
- Certifique-se de que o banco `agricultura` existe

### Servidor Não Inicia

- Verifique se a porta 3000 está disponível
- Confirme a instalação das dependências
- Verifique os logs de erro no console

### Dados Não Aparecem nas Tabelas

- Recarregue a página
- Verifique o console do navegador para erros
- Confirme se o servidor backend está respondendo

### Formulários Não Enviam

- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme a conexão com a internet
- Verifique se o servidor está acessível

## Desenvolvimento

### Estrutura de Desenvolvimento

- **Frontend**: HTML, CSS, JavaScript vanilla
- **Backend**: Node.js com Express
- **Banco de Dados**: MySQL
- **Arquitetura**: MVC (Model-View-Controller)

### Endpoints da API

- `POST /plantios` - Registrar novo plantio
- `GET /plantios` - Listar todos os plantios
- `POST /irrigacoes` - Registrar irrigação
- `GET /irrigacoes` - Listar irrigações
- `POST /colheitas` - Registrar colheita
- `GET /colheitas` - Listar colheitas

---
## Arquivos do Projeto

### package.json
```json
{
  "name": "agrocitro",
  "version": "1.0.0",
  "description": "Sistema de gestão agrícola para citricultura",
  "main": "servidor/server.js",
  "scripts": {
    "start": "node servidor/server.js",
    "dev": "node servidor/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mysql2": "^3.6.0"
  },
  "keywords": ["agricultura", "citricultura", "gestão"],
  "author": "Grupo AgroCitro",
  "license": "MIT"
}
```

### database/backup_agricultura.sql
```sql
-- Backup do Banco de Dados Agricultura
-- AgroCitro - Sistema de Gestão Agrícola

CREATE DATABASE IF NOT EXISTS agricultura;
USE agricultura;

-- Tabela de Plantios
CREATE TABLE IF NOT EXISTS Plantio (
    ID_Plantio INT AUTO_INCREMENT PRIMARY KEY,
    Variedade VARCHAR(50) NOT NULL,
    Data_Plantio DATE NOT NULL,
    Quantidade_Plantada INT NOT NULL,
    Localizacao VARCHAR(100) NOT NULL
);

-- Tabela de Irrigações
CREATE TABLE IF NOT EXISTS Irrigacao (
    ID_Irrigacao INT AUTO_INCREMENT PRIMARY KEY,
    ID_Plantio INT NOT NULL,
    Horario_Inicial TIME NOT NULL,
    Horario_Final TIME NOT NULL,
    FOREIGN KEY (ID_Plantio) REFERENCES Plantio(ID_Plantio)
);

-- Tabela de Colheitas
CREATE TABLE IF NOT EXISTS Colheita (
    ID_Colheita INT AUTO_INCREMENT PRIMARY KEY,
    ID_Plantio INT NOT NULL,
    Data_Colheita DATE NOT NULL,
    Quantidade_Colhida INT NOT NULL,
    Qualidade VARCHAR(20) NOT NULL,
    FOREIGN KEY (ID_Plantio) REFERENCES Plantio(ID_Plantio)
);

-- Dados de exemplo para Plantios
INSERT INTO Plantio (Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) VALUES
('Pera', '2024-01-15', 200, 'Setor A - Lote 1'),
('Valência', '2024-02-10', 150, 'Setor B - Lote 2'),
('Natal', '2024-01-30', 180, 'Setor A - Lote 3'),
('Lima', '2024-03-05', 120, 'Setor C - Lote 1');

-- Dados de exemplo para Irrigações
INSERT INTO Irrigacao (ID_Plantio, Horario_Inicial, Horario_Final) VALUES
(1, '08:00:00', '10:00:00'),
(1, '14:00:00', '16:00:00'),
(2, '09:00:00', '11:00:00'),
(3, '07:30:00', '09:30:00');

-- Dados de exemplo para Colheitas
INSERT INTO Colheita (ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade) VALUES
(1, '2024-06-15', 850, 'Excelente'),
(2, '2024-07-20', 720, 'Boa'),
(3, '2024-06-30', 650, 'Regular');
```

### servidor/server.js
```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');
const bancoDados = require('./repositorio/bancoDados');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Rotas para Plantios
app.post('/plantios', async (req, res) => {
    try {
        const { variedade, dataPlantio, quantidade, localizacao } = req.body;
        const resultado = await bancoDados.inserirPlantio(variedade, dataPlantio, quantidade, localizacao);
        res.json({ id: resultado.insertId, mensagem: 'Plantio registrado com sucesso' });
    } catch (erro) {
        console.error('Erro ao registrar plantio:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/plantios', async (req, res) => {
    try {
        const plantios = await bancoDados.listarPlantios();
        res.json(plantios);
    } catch (erro) {
        console.error('Erro ao buscar plantios:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// Rotas para Irrigações
app.post('/irrigacoes', async (req, res) => {
    try {
        const { idPlantio, horarioInicial, horarioFinal } = req.body;
        const resultado = await bancoDados.inserirIrrigacao(idPlantio, horarioInicial, horarioFinal);
        res.json({ id: resultado.insertId, mensagem: 'Irrigação registrada com sucesso' });
    } catch (erro) {
        console.error('Erro ao registrar irrigação:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/irrigacoes', async (req, res) => {
    try {
        const irrigacoes = await bancoDados.listarIrrigacoes();
        res.json(irrigacoes);
    } catch (erro) {
        console.error('Erro ao buscar irrigações:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// Rotas para Colheitas
app.post('/colheitas', async (req, res) => {
    try {
        const { idPlantio, dataColheita, quantidade, qualidade } = req.body;
        const resultado = await bancoDados.inserirColheita(idPlantio, dataColheita, quantidade, qualidade);
        res.json({ id: resultado.insertId, mensagem: 'Colheita registrada com sucesso' });
    } catch (erro) {
        console.error('Erro ao registrar colheita:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/colheitas', async (req, res) => {
    try {
        const colheitas = await bancoDados.listarColheitas();
        res.json(colheitas);
    } catch (erro) {
        console.error('Erro ao buscar colheitas:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor da AgroCitro rodando na porta ${PORT}`);
});
```

### servidor/repositorio/bancoDados.js
```javascript
const mysql = require('mysql2');

// Configuração do banco de dados - ATUALIZE COM SUAS CREDENCIAIS
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "sua_senha_aqui", // ALTERE PARA SUA SENHA DO MYSQL
    database: "agricultura",
    port: 3306
});

// Funções para Plantio
async function inserirPlantio(variedade, dataPlantio, quantidade, localizacao) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Plantio (Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) VALUES (?, ?, ?, ?)';
        pool.execute(query, [variedade, dataPlantio, quantidade, localizacao], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function listarPlantios() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Plantio ORDER BY Data_Plantio DESC';
        pool.execute(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Funções para Irrigação
async function inserirIrrigacao(idPlantio, horarioInicial, horarioFinal) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Irrigacao (ID_Plantio, Horario_Inicial, Horario_Final) VALUES (?, ?, ?)';
        pool.execute(query, [idPlantio, horarioInicial, horarioFinal], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function listarIrrigacoes() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Irrigacao ORDER BY Horario_Inicial DESC';
        pool.execute(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Funções para Colheita
async function inserirColheita(idPlantio, dataColheita, quantidade, qualidade) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Colheita (ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade) VALUES (?, ?, ?, ?)';
        pool.execute(query, [idPlantio, dataColheita, quantidade, qualidade], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function listarColheitas() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Colheita ORDER BY Data_Colheita DESC';
        pool.execute(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    inserirPlantio,
    listarPlantios,
    inserirIrrigacao,
    listarIrrigacoes,
    inserirColheita,
    listarColheitas
};
```
