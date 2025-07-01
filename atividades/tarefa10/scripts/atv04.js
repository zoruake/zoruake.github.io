
function ex04() {
    
    const form = document.querySelector('#form04')
    const input = form.querySelector('input[name="in_04"]').value

    const x = input.split(' ')
    const m = resolve04(x)
    
    const saida = document.querySelector('#output')
    saida.innerHTML = m.join(' ')

    form.reset()
}

function resolve04(x) {
    return x.filter(filter_perfeito)
}

function filter_perfeito(val) {
    
    let soma = 0
    for(let i = 1; i < val; i++) {
        if (val % i == 0) soma += i;
    }

    return soma == val
}
