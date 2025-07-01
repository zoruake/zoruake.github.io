
function ex03() {
    
    const form = document.querySelector('#form03')
    const input = form.querySelector('input[name="in_03"]').value

    const x = input.split(' ')
    const m = resolve03(...x)

    const saida = document.querySelector('#output')
    saida.innerHTML = m

    form.reset()
}

const resolve03 = (...x) => {
    return x.map(val => isEven(val)? 'PAR' : 'ÍMPAR') 
} 

function isEven(val) {
    return val % 2 === 0;
}

