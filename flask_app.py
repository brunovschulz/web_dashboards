from flask import Flask, request, jsonify, render_template
import csv
import os
from datetime import datetime
import pytz


app = Flask(__name__)

# Define o caminho absoluto para o arquivo CSV na pasta 'data'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, 'dados', 'dados_educacao.csv')

# Verificar se o arquivo CSV já existe, se não, criar o cabeçalho
if not os.path.exists(CSV_FILE):
    os.makedirs(os.path.dirname(CSV_FILE), exist_ok=True)
    with open(CSV_FILE, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['data', 'hora', 'uso_dados', 'dificuldade', 'tema_relevante']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

# Define o fuso horário de Recife
recife_tz = pytz.timezone('America/Fortaleza')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/envia', methods=['POST'])
def receber_dados():
    data = request.json

    # Verificar se todos os campos necessários estão presentes no JSON
    required_fields = ['uso_dados', 'dificuldade', 'tema_relevante']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Faltam campos obrigatórios"}), 400


    # Adicionar data e hora locais (Recife)
    now = datetime.now(recife_tz)

    # Adicionar data e hora locais
    data['data'] = now.strftime('%Y-%m-%d')
    data['hora'] = now.strftime('%H:%M:%S')

    # Adicionar os dados ao CSV
    with open(CSV_FILE, 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['data', 'hora', 'uso_dados', 'dificuldade', 'tema_relevante']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow(data)

    return jsonify({"message": "Dados recebidos e armazenados com sucesso!"}), 200

@app.route('/dados-echart', methods=['GET'])
def obter_dados_echart():
    dados = []

    # Ler os dados do arquivo CSV
    with open(CSV_FILE, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            dados.append(row)

    return jsonify(dados), 200

@app.route('/dados', methods=['GET'])
def obter_dados():
    dados = []

    # Ler os dados do arquivo CSV
    with open(CSV_FILE, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            dados.append(row)

    return jsonify(dados), 200

'''
# Endpoint para exibir o dashboard
@app.route('/dashboard', methods=['GET'])
def dashboard():
    # Coletar dados do CSV
    dados = {
        "data": [],
        "hora": [],
        "uso_dados": [],
        "dificuldade": [],
        "tema_relevante": []
    }

    with open(CSV_FILE, 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            dados["data"].append(row['data'])
            dados["hora"].append(row['hora'])
            dados["uso_dados"].append(row['uso_dados'])
            dados["dificuldade"].append(row['dificuldade'])
            dados["tema_relevante"].append(row['tema_relevante'])

    # Renderizar o template com os dados
    return render_template('dashboard.html', dados=dados)

# Endpoint para o dashboard com ECharts
@app.route('/dashboard-echart')
def dashboard_echart():
    return render_template('dashboard-echart.html')
'''

# Endpoint para o dashboard com ECharts
@app.route('/dashboard-epie')
def dashboard_pie():
    return render_template('dashboard-epie.html')

# Endpoint para o dashboard com ECharts
@app.route('/dashboard-pictogram')
def dashboard_pictogram():
    return render_template('dashboard-pictogram.html')

if __name__ == '__main__':
    app.run(debug=True)