import * as echarts from 'echarts';

// Seleciona a div com a classe "graphic bar"
var chartDom = document.querySelector('.graphic.bar');
var myChart = echarts.init(chartDom);
var option;

const spirit = '../assets/logo-cite 2024.png';
var maxData = 2000;

// Função para buscar os dados
async function fetchDados() {
    try {
        const response = await fetch('http://localhost:3000/dados');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();

        // Supondo que `data` seja um array de objetos e que você tenha a coluna `uso_dados`
        const usoDados = data.map(item => item.uso_dados); // Ajuste conforme a estrutura real dos dados

        // Atualizar o gráfico com os dados obtidos
        updateChart(usoDados);
    } catch (error) {
        console.error('Houve um problema com a requisição Fetch:', error);
    }
}

// Função para atualizar o gráfico
function updateChart(usoDados) {
    option = {
        tooltip: {},
        xAxis: {
            max: maxData,
            splitLine: { show: false },
            offset: 10,
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                margin: 10
            }
        },
        yAxis: {
            data: ['2013', '2014', '2015', '2016'], // Certifique-se de que esses rótulos estão de acordo com os seus dados
            inverse: true,
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                margin: 10,
                color: '#999',
                fontSize: 16
            }
        },
        grid: {
            top: 'center',
            height: 200,
            left: 70,
            right: 100
        },
        series: [
            {
                // dados atuais
                type: 'pictorialBar',
                symbol: spirit,
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbolClip: true,
                symbolSize: 30,
                symbolBoundingData: maxData,
                data: usoDados.slice(0, 4), // Limitar para os 4 primeiros dados
                markLine: {
                    symbol: 'none',
                    label: {
                        formatter: 'max: {c}',
                        position: 'start'
                    },
                    lineStyle: {
                        color: 'green',
                        type: 'dotted',
                        opacity: 0.2,
                        width: 2
                    },
                    data: [
                        {
                            type: 'max'
                        }
                    ]
                },
                z: 10
            },
            {
                // dados completos
                type: 'pictorialBar',
                itemStyle: {
                    opacity: 0.2
                },
                label: {
                    show: true,
                    formatter: function (params) {
                        return ((params.value / maxData) * 100).toFixed(1) + ' %';
                    },
                    position: 'right',
                    offset: [10, 0],
                    color: 'green',
                    fontSize: 18
                },
                animationDuration: 0,
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbol: spirit,
                symbolSize: 30,
                symbolBoundingData: maxData,
                data: usoDados.slice(0, 4), // Limitar para os 4 primeiros dados
                z: 5
            }
        ]
    };

    // Definindo as opções no gráfico
    myChart.setOption(option);
}

// Chamar a função para buscar os dados ao carregar a página
fetchDados();
