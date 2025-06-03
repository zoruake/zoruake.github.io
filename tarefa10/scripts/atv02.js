
function ex02() {
    
    const form = document.querySelector('#form02')
    const input = form.querySelector('input[name="in_02"]').value

    const x = input.split(' ')
    const m = resolve02(...x)

    const saida = document.querySelector('#output')
    saida.innerHTML = m

    form.reset()
}

const resolve02 = (...x) => {

    let soma = 0;
    for(i in x) { 
        soma += parseInt(x[i])
    }

    let media = soma / x.length

    return media;
} 


