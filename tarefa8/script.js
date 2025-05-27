
let segundos = 0;
let tempoAtivo = true;
let movimentoAtivo = true;
let foguetesAtivos = true;
let alienAtivo = true;
let faseAtual = 1;
let alien1Interval, alien2Interval, alien3Interval;
let proximaFaseEmAndamento = false;


var alienCount = 0;
var lifeCount = 3;

let gameSpeed = 0.5;


const nextRoundMessage = document.getElementById("nextRoundMessage");
const timerElement = document.getElementById('timer');
const pausedMessage = document.getElementById('pausedMessage');
const lostMessage = document.getElementById('lostMessage');
const overMessage = document.getElementById('gameOverMessage');

const alien1 = document.getElementById("alien1");
const alien2 = document.getElementById("alien2");
const alien3 = document.getElementById("alien3");

const rocketLeft = document.getElementById("rocketLeft");
const rocketRight = document.getElementById("rocketRight");

let player = document.getElementById("player");
let leftPosition = 50;

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

// Função de pausa e retomada
function togglePause() {

    tempoAtivo = !tempoAtivo;
    movimentoAtivo = !movimentoAtivo;
    foguetesAtivos = !foguetesAtivos;
    alienAtivo = !alienAtivo;

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
    if (proximaFaseEmAndamento) return; // PARA QUESTÕES DE TESTE, PODE-SE RETIRAR PARA APERTAR P PARA PULAR DE FASE AO VENCER 1 RODADA.

    if (event.key === 'p' || event.key === 'P') {
        togglePause();
    } else if (event.key === ' ' || event.key === ' ') {
        resumeGame();
    }
});

// Movimento da nave
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
    let toggleSide = true; // alterna entre esquerdo e direito
    let isShooting = false;

    let rocketLeftDone = false;
    let rocketRightDone = false;

    function checkReset() {
        if (rocketLeftDone && rocketRightDone) {
            rocketLeft.style.bottom = "0px";
            rocketRight.style.bottom = "0px";
            rocketLeftDone = false;
            rocketRightDone = false;
            rocketLeft.style.display = "block";
            rocketRight.style.display = "block";
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space" && foguetesAtivos && !isShooting) {
            isShooting = true;

            if (toggleSide) {
                launchRocket(rocketLeft, () => {
                    rocketLeftDone = true;
                    checkReset();
                    isShooting = false;
                });
            } else {
                launchRocket(rocketRight, () => {
                    rocketRightDone = true;
                    checkReset();
                    isShooting = false;
                });
            }

            toggleSide = !toggleSide;

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
    window.alert("A / D - Mover-se ~~ P / Space - Pausar / Voltar / Continuar")
    movePlayer();
    shootRockets();
    defCounters();
};

var isLost = false;

// Movimento dos aliens
function alienMovement(alienElement, intervalRef) {
    let top = -150;
    let topgear = 0;
    const maxHeight = window.innerHeight;

    const interval = setInterval(() => {
        if (!alienAtivo) return;

        if (topgear >= maxHeight - 100) {
            clearInterval(interval);
            isLost = true;
            lostRound();
        } else {
            top += gameSpeed;
            topgear += gameSpeed;
            alienElement.style.top = top + "px";
        }
    }, 10);

    // Salva o ID do intervalo na variável certa
    if (intervalRef === 'alien1') alien1Interval = interval;
    if (intervalRef === 'alien2') alien2Interval = interval;
    if (intervalRef === 'alien3') alien3Interval = interval;
}


function stopAlienMovements() {
    clearInterval(alien1Interval);
    clearInterval(alien2Interval);
    clearInterval(alien3Interval);
}


function resetAlienPosition(alienElement) {
    alienElement.style.top = "-150px"; // Reseta a posição
    alienElement.style.display = "block"; // Garante que fique visível após reset
}

function lostRound() {
    tempoAtivo = !tempoAtivo;
    movimentoAtivo = !movimentoAtivo;
    foguetesAtivos = !foguetesAtivos;
    alienAtivo = !alienAtivo;

    if (tempoAtivo) {
        lostMessage.style.display = 'none';
    } else {
        lostMessage.style.display = 'block';
    }
}

function tryAgain() {
    if (!tempoAtivo) {
        togglePause();
    }

    stopAlienMovements();

    // Reposiciona os aliens antes de começar a movimentação novamente
    resetAlienPosition(alien1);
    resetAlienPosition(alien2);
    resetAlienPosition(alien3);

    // Re-inicia o movimento dos aliens
    alienMovement(alien1, 'alien1');
    alienMovement(alien2, 'alien2');
    alienMovement(alien3, 'alien3');

    lostMessage.style.display = 'none';
}

document.addEventListener("keydown", function(event) {
    if (isLost === false){
        return;
    }
    if (event.key === ' ' || event.key === ' ') {
        if(lifeCount === 1) {
            let textlifeCount = document.getElementById("lifeCount"); // Corrigido o método
            textlifeCount.textContent = "LIFE: 0"; // Atualiza o texto
            let textoLstRound = document.getElementById("lostMessage");
            textoLstRound.textContent = "GAME OVER";
            return;
        }

        tryAgain();
        lifeCount--;
        gameSpeed += 0.2;
        defCounters();
        isLost = false
    }
});

function defCounters() {
    let textlifeCount = document.getElementById("lifeCount"); // Corrigido o método
    textlifeCount.textContent = "LIFE: " + lifeCount; // Atualiza o texto
}


alienMovement(alien1, 'alien1');
alienMovement(alien2, 'alien2');
alienMovement(alien3, 'alien3');



function colisao(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
  
    return !(
      rect1.top > rect2.bottom ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right ||
      rect1.right < rect2.left
    );
  }
  
  let pontos = 0;
  let pontosElement = document.getElementById("alienCount");
  
  function atualizarPontos(){
    pontos++;
    pontosElement.innerText = `ALIEN: ` + pontos;
  }
  function verificarColisao() {
    const aliens = document.querySelectorAll('.aliens');
  
    aliens.forEach(alien => {
      if(alien.style.display === "none"){return};
      const  colisaoEsquerda = colisao(rocketLeft, alien);
      const  colisaoDireita = colisao(rocketRight, alien);
  
      if (colisaoEsquerda || colisaoDireita){
        alien.style.display = 'none';
  
        atualizarPontos();
  
        if(colisaoEsquerda){
            rocketLeft.style.display = 'none';
        } else if(colisaoDireita){
            rocketRight.style.display = 'none';
        }
      }
    });

    checkLevel();
  }
  
  setInterval(() => {
    if(tempoAtivo) {
      verificarColisao();
    }
  }, 100);

function checkLevel() {
    const aliens = document.querySelectorAll('.aliens');
    let qtdAlienDefeated = 0;
    aliens.forEach(alien => {
        if(alien.style.display === 'none') {
            qtdAlienDefeated++;
        }
    })

    if(qtdAlienDefeated === 3){
        faseAtual++;
        qtdAlienDefeated = 0;
        proximaFaseEmAndamento = true;
        nextLevel();
    }
}
function nextLevel() {
    tempoAtivo = false;
    movimentoAtivo = false;
    foguetesAtivos = false;
    alienAtivo = false;

    gameSpeed += 0.5;

    nextRoundMessage.style.display = 'block';
    document.body.style.backgroundImage = `url(images/background${faseAtual}.png)`;

    setTimeout(() => {
        tempoAtivo = true;
        movimentoAtivo = true;
        foguetesAtivos = true;
        alienAtivo = true;
        nextRoundMessage.style.display = 'none';
    
        proximaFaseEmAndamento = false; // <-- Libera para próxima fase no futuro
        tryAgain();
    }, 2000);
}

setInterval(() => {
    if(tempoAtivo) {
      if (faseAtual > 4){
        tempoAtivo = !tempoAtivo;
        movimentoAtivo = !movimentoAtivo;
        foguetesAtivos = !foguetesAtivos;
        alienAtivo = !alienAtivo;
        nextRoundMessage.style.display = 'block';
      }
    }
  }, 100);
