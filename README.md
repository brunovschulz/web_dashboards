# Integração do Dashboard com Formulário para Alimentação de Gráficos e Pictogramas em Tempo Real

## Descrição
O Letramento Crítico em Dados na Educação Básica

Este projeto é um site com um formulário integrado, desenvolvido para a palestra "O Letramento Crítico em Dados na Educação Básica", parte do XX Congresso Internacional de Inovação na Educação. Durante a apresentação, o palestrante utilizará, em tempo real, os dados fornecidos pelos participantes para ilustrar e enriquecer a discussão sobre o tema.

## Funcionalidades
- QR code para facilitar o acesso rápido à participação.
- Gráficos e pictogramas para ilustrar dados relacionados a palestra.
- Formulário para extração de dados.


## Instalação e Configuração

### Inicialização do Node.Js
- npm init -y
- npm install express csv-parser fs body-parser
- npm install luxon
- npm install echarts

## Tecnologias Utilizadas

- HTML5: Estrutura do site
- CSS3: Estilização e layout
- JavaScript: Back-end
- Node.JS: Back-end 


### Arvore de arquivos
```
├── app.js
├── dados
│   └── dados_educacao.csv
├── package.json
├── package-lock.json
├── node_modules
└── public
    ├── assets
    │   ├── charles.jpeg
    │   ├── logo-cite 2024.png
    │   ├── Logo_Letramento_SemFundo.png
    │   └── qrcode.jpeg
    ├── pages
    │   ├── dashboard.html
    │   ├── index.html
    │   └── info.html
    ├── script
    │   ├── dahsboard_bar.js
    │   ├── dashboard_pie.js
    │   └── form.js
    └── style
        ├── dashboard.css
        ├── index.css
        └── info.css
        
