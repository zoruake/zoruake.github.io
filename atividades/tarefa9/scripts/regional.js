
const data_regionals = []

function addRegional() {
    const i = data_regionals.length;
    const regional = {}

    const form = document.querySelector('#formRegional')
    const input_nome = form.querySelector('input[name="sigla"]')
    regional.sigla = input_nome
    const input_nome_cidade = form.querySelector('input[name="cidade"]')
    regional.cidade = input_nome_cidade
    const id = i+1;

    regional.id = id


    const table = document.querySelector('#table_regional');
    const line = document.createElement('tr')
    const col_id = document.createElement('td')  
    col_id.textContent = id
    const col_nome = document.createElement('td')    
    col_nome.textContent = input_nome.value
    const col_nome_cidade = document.createElement('td')
    col_nome_cidade.textContent = input_nome_cidade.value 

    
    line.appendChild(col_id);
    line.appendChild(col_nome);
    line.appendChild(col_nome_cidade)

    table.appendChild(line);
    data_regionals.push(regional)
    drawChart();

    const select = document.querySelector('#select_regional');
    const op = document.createElement("option");     
    op.textContent = input_nome.value
    op.value = input_nome.value
    select.appendChild(op)

    form .reset()
}
