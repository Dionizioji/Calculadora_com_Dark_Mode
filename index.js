// Calculadora completa com modo Dark/Light e botão pra copiar resultado para a área de transferência
let naTela = document.getElementById('tela')
let resposta = document.getElementById('resposta')
let teclasDaCalc = ['(', ')', '%', 'C', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']

document.getElementById('igual').addEventListener('click', function () {
    calcula()  
})

naTela.addEventListener('keydown', function (ev) {
    ev.preventDefault()
    if (teclasDaCalc.includes(ev.key)) {
        naTela.value += ev.key
        return
    }
    if (ev.key === 'Backspace') {
        naTela.value = naTela.value.slice(0, -1)
        return
    }
    if (ev.key === 'Enter') {
        calcula()
    }
})

function limpaTela() {
    naTela.value = ''
    resposta.value = ''
    resposta.classList.remove('error') 
    naTela.focus()
}

document.getElementById('clear').addEventListener('click', function () {
    limpaTela()
})

function calcula() {
    try {
        let resultado = eval(naTela.value) 
        naTela.value = resultado          
        resposta.value = resultado        
        resposta.classList.remove('error') 
    } catch (e) {
        resposta.value = 'ERROR'
        resposta.classList.add('error')    
    }
}

document.getElementById('switchMode').addEventListener('click', function () {
    let principal = document.getElementById('principal')
    let colors = document.querySelector(':root')
    if (principal.dataset.theme === 'dark') {
        colors.style.setProperty('--backgroundcolordark', '#e8daef')
        colors.style.setProperty('--buttondark', '#4a235a')
        colors.style.setProperty('--fontcolordark', 'black')
        principal.dataset.theme = 'light'
    } else {
        colors.style.setProperty('--backgroundcolordark', '#4a235a')
        colors.style.setProperty('--buttondark', '#e8daef')
        colors.style.setProperty('--fontcolordark', '#e8daef')
        principal.dataset.theme = 'dark'
    }
})

document.querySelectorAll('.calcButtons').forEach(function (keybutton) {
    keybutton.addEventListener('click', function () {
        let teclaPressionada = keybutton.dataset.value
        if (teclaPressionada.trim() === 'C') {
            limpaTela()
        } else if (teclaPressionada.trim() === '=') {
            calcula() 
        } else {
            naTela.value += teclaPressionada
            naTela.focus() 
        }
    })
})

document.getElementById('copyButton').addEventListener('click', function (ev) {
    let botao = ev.currentTarget
    if (botao.innerText === 'Copy') {
        botao.innerText = 'Copied'
        botao.classList.add('sucesso')
        navigator.clipboard.writeText(resposta.value)
    } else {
        botao.innerText = 'Copy'
        botao.classList.remove('sucesso')
    }
})
