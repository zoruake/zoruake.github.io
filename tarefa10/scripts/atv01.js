
function ex01() {
    
    const form = document.querySelector('#form01')
    const input = form.querySelector('input[name="in_01"]').value

    const x = input.split(' ')
    const m = resolve01(...x)

    const saida = document.querySelector('#output')
    saida.innerHTML = m

    form.reset()
}

function resolve01() {

    let soma = 0;
    for(i in arguments) { 
        soma += parseInt(arguments[i]);
    }

    let media = soma / arguments.length

    return media;
} 


