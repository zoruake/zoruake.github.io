
const data_agents = []

function addAgent() {
    const i = data_agents.length;
    const agent = {}

    const form = document.querySelector('#formAgent')
    
    const input_nome = form.querySelector('input[name="nome"]')
    agent.nome = input_nome
    const input_regional = form.querySelector('select[name="regional"]')
    agent.regional = input_regional
    const id = i+1;

    agent.id = id

    const table = document.querySelector('#table_agent');
    const line = document.createElement('tr')
    const col_id = document.createElement('td')

    col_id.textContent = id
    const col_nome = document.createElement('td') 
    
    col_nome.textContent = input_nome.value
  
    const col_regional = document.createElement('td')
    col_regional.textContent = input_regional.value 
    line.appendChild(col_id);
    line.appendChild(col_nome);
    line.appendChild(col_regional)
 
    table.appendChild(line);
    data_agents.push(agent)
    drawChart();

    const select = document.querySelector('#select_agent');
    const op = document.createElement("option");
    op.textContent = input_nome.value
    op.value = input_nome.value
    select.appendChild(op)

    form .reset()
}
