const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "agricultura",
    port: 3306
});

async function buscarPlantios() {
    const [plantios] = await pool.query("SELECT * FROM Plantio");
    return plantios;
}

async function adicionarPlantio(variedade, dataPlantio, quantidade, localizacao) {
    const [resultado] = await pool.query(
        "INSERT INTO Plantio (Variedade, Data_Plantio, Quantidade_Plantada, Localizacao) VALUES (?, ?, ?, ?)",
        [variedade, dataPlantio, quantidade, localizacao]
    );
    return resultado;
}

async function buscarIrrigacoes() {
    const [irrigacoes] = await pool.query("SELECT * FROM Irrigacao");
    return irrigacoes;
}

async function adicionarIrrigacao(idPlantio, horarioInicial, horarioFinal) {
    const [resultado] = await pool.query(
        "INSERT INTO Irrigacao (ID_Plantio, Horario_Inicial, Horario_Final) VALUES (?, ?, ?)",
        [idPlantio, horarioInicial, horarioFinal]
    );
    return resultado;
}

async function buscarColheitas() {
    const [colheitas] = await pool.query("SELECT * FROM Colheita");
    return colheitas;
}

async function adicionarColheita(idPlantio, dataColheita, quantidade, qualidade) {
    const [resultado] = await pool.query(
        "INSERT INTO Colheita (ID_Plantio, Data_Colheita, Quantidade_Colhida, Qualidade) VALUES (?, ?, ?, ?)",
        [idPlantio, dataColheita, quantidade, qualidade]
    );
    return resultado;
}

module.exports = {
    buscarPlantios,
    adicionarPlantio,
    buscarIrrigacoes,
    adicionarIrrigacao,
    buscarColheitas,
    adicionarColheita
};