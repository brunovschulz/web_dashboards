const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { DateTime } = require('luxon'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
const BASE_DIR = __dirname;
const CSV_FILE = path.join(BASE_DIR, 'dados', 'dados_educacao.csv');

if (!fs.existsSync(CSV_FILE)) {
    fs.mkdirSync(path.dirname(CSV_FILE), { recursive: true });
    const header = 'data,hora,uso_dados,dificuldade,tema_relevante\n';
    fs.writeFileSync(CSV_FILE, header, 'utf-8');
}

const recifeTz = 'America/Fortaleza';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/index.html'));
});

app.post('/form', (req, res) => {
    const data = req.body;

    const requiredFields = ['uso_dados', 'dificuldade', 'tema_relevante'];
    if (!requiredFields.every(field => field in data)) {
        return res.status(400).json({ error: "Faltam campos obrigatórios" });
    }

    const now = DateTime.now().setZone(recifeTz);
    data.data = now.toFormat('yyyy-MM-dd');
    data.hora = now.toFormat('HH:mm:ss');

    const row = `${data.data},${data.hora},${data.uso_dados},${data.dificuldade},${data.tema_relevante}\n`;
    fs.appendFileSync(CSV_FILE, row, 'utf-8');

    res.json({ message: "Dados recebidos e armazenados com sucesso!" });
});


app.get('/dados', (req, res) => {
    const dados = [];

    fs.createReadStream(CSV_FILE)
        .pipe(csv())
        .on('data', (row) => dados.push(row))
        .on('end', () => {
            res.json(dados);
        });
});

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/info.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
