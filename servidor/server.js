const express = require("express");
const cors = require("cors");

const {
    buscarPlantios,
    adicionarPlantio,
    buscarIrrigacoes,
    adicionarIrrigacao,
    buscarColheitas,
    adicionarColheita
} = require("./repositorio/bancodados");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/plantios", async (req, res) => {
    try {
        const plantios = await buscarPlantios();
        res.json(plantios);
    } catch (erro) {
        res.status(500).json(erro);
    }
});

app.post("/plantios", async (req, res) => {
    try {
        const { variedade, dataPlantio, quantidade, localizacao } = req.body;
        const resultado = await adicionarPlantio(variedade, dataPlantio, quantidade, localizacao);
        res.json({ id: resultado.insertId, mensagem: "Plantio cadastrado com sucesso!" });
    } catch (erro) {
        res.status(500).json(erro);
    }
});

app.get("/irrigacoes", async (req, res) => {
    try {
        const irrigacoes = await buscarIrrigacoes();
        res.json(irrigacoes);
    } catch (erro) {
        res.status(500).json(erro);
    }
});

app.post("/irrigacoes", async (req, res) => {
    try {
        const { idPlantio, horarioInicial, horarioFinal } = req.body;
        const resultado = await adicionarIrrigacao(idPlantio, horarioInicial, horarioFinal);
        res.json({ id: resultado.insertId, mensagem: "Irrigação cadastrada com sucesso!" });
    } catch (erro) {
        res.status(500).json(erro);
    }
});

app.get("/colheitas", async (req, res) => {
    try {
        const colheitas = await buscarColheitas();
        res.json(colheitas);
    } catch (erro) {
        res.status(500).json(erro);
    }
});

app.post("/colheitas", async (req, res) => {
    try {
        const { idPlantio, dataColheita, quantidade, qualidade } = req.body;
        const resultado = await adicionarColheita(idPlantio, dataColheita, quantidade, qualidade);
        res.json({ id: resultado.insertId, mensagem: "Colheita cadastrada com sucesso!" });
    } catch (erro) {
        res.status(500).json(erro);
    }
});

app.listen(3000, () => {
    console.log("Servidor da AgroCitro rodando na porta 3000");
});