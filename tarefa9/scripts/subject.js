
const data_subjects = []


function addSubject() {
    const i = data_subjects.length;
    const assunto = {}

    const form = document.querySelector('#formSubject')
    const input_nome = form.querySelector('input[name="descricao"]')
    const id = i+1;

    assunto.nome = input_nome
    assunto.id = id


    const table = document.querySelector('#table_subject');
    const line = document.createElement('tr')
    const col_id = document.createElement('td') 
    col_id.textContent = id
    const col_nome = document.createElement('td')     
    col_nome.textContent = input_nome.value
    line.appendChild(col_id);
    line.appendChild(col_nome);
    table.appendChild(line);
    data_subjects.push(assunto)
    drawChart();


    const select = document.querySelector('#select_subject');
    const op = document.createElement("option"); 
    op.textContent = input_nome.value
    op.value = input_nome.value
    select.appendChild(op)

    form .reset()
}
