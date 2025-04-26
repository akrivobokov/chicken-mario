let score = 0;
let lives = 3;
let player = document.getElementById('player');
let x = 50;
let y = 0;
let vy = 0;
let onGround = false;
let moveLeft = false;
let moveRight = false;
let eggsCollected = 0;
let totalEggs = 2;

document.getElementById('left-button').addEventListener('touchstart', () => moveLeft = true);
document.getElementById('left-button').addEventListener('touchend', () => moveLeft = false);
document.getElementById('right-button').addEventListener('touchstart', () => moveRight = true);
document.getElementById('right-button').addEventListener('touchend', () => moveRight = false);
document.getElementById('jump-button').addEventListener('touchstart', () => {
  if (onGround) { vy = 15; onGround = false; }
});

function startGame() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  loadLevel();
  update();
}

function loadLevel() {
  createPlatform(0, 0, 600);
  createPlatform(300, 120, 200);
  createEgg(100, 20);
  createEgg(350, 140);
  createEnemy(250, 20);
}

function createPlatform(x, y, width) {
  const plat = document.createElement('div');
  plat.className = 'platform';
  plat.style.left = x + 'px';
  plat.style.bottom = y + 'px';
  plat.style.width = width + 'px';
  document.getElementById('game').appendChild(plat);
}

function createEgg(x, y) {
  const egg = document.createElement('div');
  egg.className = 'egg';
  egg.style.left = x + 'px';
  egg.style.bottom = y + 'px';
  egg.addEventListener('click', () => collectEgg(egg));
  egg.addEventListener('touchstart', () => collectEgg(egg));
  document.getElementById('game').appendChild(egg);
}

function collectEgg(egg) {
  egg.remove();
  eggsCollected++;
  score += 10;
  document.getElementById('score').textContent = 'Очки: ' + score;
  if (eggsCollected >= totalEggs) {
    document.getElementById('game').style.display = 'none';
    document.getElementById('win').style.display = 'flex';
  }
}

let enemy;
function createEnemy(x, y) {
  enemy = document.createElement('div');
  enemy.className = 'enemy';
  enemy.style.left = x + 'px';
  enemy.style.bottom = y + 'px';
  document.getElementById('game').appendChild(enemy);
}

function update() {
  if (moveRight) x += 5;
  if (moveLeft) x -= 5;

  vy -= 0.8;
  y += vy;
  if (y <= 0) { y = 0; vy = 0; onGround = true; }

  player.style.left = x + 'px';
  player.style.bottom = y + 'px';

  if (enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    if (playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top) {
      loseGame();
    }
  }

  requestAnimationFrame(update);
}

function loseGame() {
  lives--;
  if (lives <= 0) {
    document.getElementById('game').style.display = 'none';
    document.getElementById('lose').style.display = 'flex';
  } else {
    x = 50;
    y = 0;
  }
}

function restartGame() {
  location.reload();
}
