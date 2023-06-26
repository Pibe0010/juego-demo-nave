let nave = document.querySelector(".nave");
let body = document.querySelector("body");
let laser = document.getElementById("laser");
let explosion = document.getElementById("explosion");
let live = document.querySelector("i");
let times = document.getElementById("times");

const controls = document.querySelectorAll(".control i")
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");


let lives = 5;
let second = 60;
let score = 0;


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score : ${highScore}`;

setInterval(() => {
    second--;
    times.textContent = second;

    if(second == 0) {
        alert("YOU WIN");
        location.reload();
    }
}, 1000);

document.addEventListener("mousemove", (e) => {
    nave.style.left = (e.clientX - 40) + 'px';
});

// Generar disparos de la nave

document.addEventListener("click", () => {
    let bala = document.createElement('div');
    bala.classList.add('bala');
    bala.style.bottom = 70 + 'px';
    bala.style.left = (nave.getBoundingClientRect().left + 40) + 'px';
    body.append(bala);
    laser.play();
});

// Moviminto de disparos

setInterval(() => {
    let balas = document.querySelectorAll(".bala");
    balas.forEach(bala => {
        bala.style.top = (bala.getBoundingClientRect().top - 20) + 'px';

        if(bala.getBoundingClientRect().top <= 0) {
            bala.remove();
        }
        // Detectando colisiones

        let enemigos = document.querySelectorAll(".enemigo");

        enemigos.forEach(enemigo => {
            if(bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top + 50) {
                if(bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left && bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left + 80) {
                    explosion.play();
                    enemigo.style.backgroundImage = 'url("/img/explosion.png")';

                    setTimeout(() => {
                        enemigo.remove();
                        score++;
                        highScore = score >= highScore ? score : highScore;
                        localStorage.setItem("high-score", highScore);
                        scoreElement.innerHTML = `Score: ${score}`;
                        highScoreElement.innerHTML = `High Score : ${highScore}`;
                        explosion.stop();
                    }, 100);
                }
            }
        });
    });
}, 100);

// Generar meteoritos

let aparecer = 0;


setInterval(() => {
    aparecer++;
    
    if(aparecer % 10 == 0) {

    let enemigo = document.createElement("div");
    enemigo.classList.add("enemigo");
    body.append(enemigo);
    enemigo.style.left = (Math.random() * window.innerWidth - 100) + 'px';
    }
    let enemigos = document.querySelectorAll('.enemigo');
    enemigos.forEach(element => {
        element.style.top = (element.getBoundingClientRect().top + 10) + 'px';
        if(element.getBoundingClientRect().top > nave.getBoundingClientRect().top) {
            lives--;
            live.textContent = lives;
            if(lives == -1) {
                alert("GAME OVER")
                location.reload();
                }
                    
                element.remove();
            }
    });
    
}, 100);


