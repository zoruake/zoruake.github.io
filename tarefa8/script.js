let segundos = 0;
let tempoAtivo = true;  
let movimentoAtivo = true; 
let foguetesAtivos = true; 

const timerElement = document.getElementById('timer');
const pausedMessage = document.getElementById('pausedMessage');

function atualizarTimer() {
    if (!tempoAtivo) return;  

    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    timerElement.textContent =
        `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
    segundos++;
}

setInterval(atualizarTimer, 1000);

// Função para alternar entre pausa e continuação
function togglePause() {
    tempoAtivo = !tempoAtivo;  
    movimentoAtivo = !movimentoAtivo;  
    foguetesAtivos = !foguetesAtivos;  

    if (tempoAtivo) {
        pausedMessage.style.display = 'none';  
    } else {
        pausedMessage.style.display = 'block';  
    }
}

function resumeGame() {
    if (!tempoAtivo) {
        togglePause();  
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === 'b' || event.key === 'B') {
        togglePause();  
    } else if (event.key === 'r' || event.key === 'R') {
        resumeGame();  
    }
});

// Movimento da nave
let player = document.getElementById("player");
let leftPosition = 50;

function movePlayer() {
    document.addEventListener('keypress', function (event) {
        if (!movimentoAtivo) return;  // Se o movimento estiver pausado, não move

        if (event.key === 'a' || event.key === 'A') {
            if (leftPosition <= 12) return;
            leftPosition -= 1;
            player.style.left = leftPosition + "%";
        } else if (event.key === 'd' || event.key === 'D') {
            if (leftPosition >= 88) return;
            leftPosition += 1;
            player.style.left = leftPosition + "%";
        }
    });
}

function shootRockets() {
    const rocketLeft = document.getElementById("rocketLeft");
    const rocketRight = document.getElementById("rocketRight");

    let isShooting = false;

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space" && !isShooting && foguetesAtivos) {
            isShooting = true;
            launchRocket(rocketLeft, () => {
                launchRocket(rocketRight, () => {
                    // Resetar os dois foguetes
                    rocketLeft.style.bottom = "0px";
                    rocketRight.style.bottom = "0px";
                    isShooting = false;
                });
            });
        }
    });
}

function launchRocket(rocketElement, callback) {
    let bottom = 0;
    const maxHeight = window.innerHeight; // altura máxima da tela em pixels

    const interval = setInterval(() => {
        if (bottom >= maxHeight) {
            clearInterval(interval);
            if (callback) callback();
        } else {
            bottom += 10; // velocidade
            rocketElement.style.bottom = bottom + "px";
        }
    }, 10);
}

window.onload = () => {
    movePlayer();
    shootRockets();
};
