// Faz a requisição para a URL e obtém os dados
fetch('http://localhost:3000/dados')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Conta as dificuldades
        const dificuldadeCounts = data.reduce((acc, item) => {
            const dificuldade = item.dificuldade; // Altere aqui para 'dificuldade'
            acc[dificuldade] = (acc[dificuldade] || 0) + 1;
            return acc;
        }, {});

        // Prepara os dados para o gráfico
        const chartData = Object.entries(dificuldadeCounts).map(([name, value]) => ({
            name,
            value
        }));

        // Seleciona os contêineres dos gráficos
        const containers = document.querySelectorAll('.pie');

        containers.forEach((container, index) => {
            const myChart = echarts.init(container);
            const option = {
                title: {
                    text: 'Maior Dificuldade',
                    left: 'center',
                    top: '5%' // Ajuste a posição do título
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'center',
                    top: '15%' // Coloca a legenda logo abaixo do título
                },
                series: [
                    {
                        name: 'Dificuldades',
                        type: 'pie',
                        radius: '50%',
                        data: chartData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            show: true,
                            formatter: '{d}%',
                            position: 'inside'
                        } // Formatação para mostrar o nome e a porcentagem
                    }
                ]
            };
            myChart.setOption(option);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
