
function drawChart() {

    var freqData = google.visualization.arrayToDataTable([
        ['Categoria', 'Quantidade', { role: 'style' }],
        ['Agentes', data_agents.length, 'color: #ADD8E6'],
        ['Assuntos', data_subjects.length, 'color: #ADD8E6'],
        ['Regionais', data_regionals.length, 'color: #ADD8E6'],
        ['Relatórios', data_reports.length, 'color: #ADD8E6']
    ]);

    var freqOptions = {
        title: 'Distribuição de Itens',
        chartArea: { width: '80%' },
        legend: 'none'
    };

    var freqChart = new google.visualization.ColumnChart(document.getElementById('chart'));
    freqChart.draw(freqData, freqOptions);
}
