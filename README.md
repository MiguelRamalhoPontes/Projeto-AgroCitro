# AgroCitro

## Grupo
- Miguel Pontes
- Kaio Vinicius
- Thierry Vinicius
- Emanuel Ferreti

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

