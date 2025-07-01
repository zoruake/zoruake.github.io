
const data_reports = []

function addReport() {
    const i = data_reports.length;
    const report = {}

    
    const form = document.querySelector('#formReport')

    const input_date = form.querySelector('input[name="data"]')
    report.data = input_date
    
    const input_nome = form.querySelector('select[name="assunto"]')
    report.sigla = input_nome
    const input_nome_cidade = form.querySelector('select[name="agente"]')
    report.cidade = input_nome_cidade
    const id = i+1;

    report.id = id

    const table = document.querySelector('#table_report');
    const line = document.createElement('tr')
    const col_id = document.createElement('td')  
    col_id.textContent = id

    const col_data = document.createElement('td')
    col_data.textContent = input_date.value
    const col_subject = document.createElement('td')  
    col_subject.textContent = input_nome.value
    const col_agent = document.createElement('td')
    col_agent.textContent = input_nome_cidade.value 
    line.appendChild(col_id);
    line.appendChild(col_data)
    line.appendChild(col_subject);
    line.appendChild(col_agent)
    table.appendChild(line);
    data_reports.push(report)
    drawChart();

 
    form .reset()
}
