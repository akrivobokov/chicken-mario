let score = 0;
let lives = 3;
let currentLevel = 0;
let eggsTotal = 0;
let eggsCollected = 0;
let enemiesList = [];

const player = document.getElementById('player');
let x = 50;
let y = 0;
let vy = 0;
let onGround = false;

let moveLeft = false;
let moveRight = false;

document.getElementById('left-button').addEventListener('touchstart', () => moveLeft = true);
document.getElementById('left-button').addEventListener('touchend', () => moveLeft = false);
document.getElementById('right-button').addEventListener('touchstart', () => moveRight = true);
document.getElementById('right-button').addEventListener('touchend', () => moveRight = false);
document.getElementById('jump-button').addEventListener('touchstart', () => {
  if (onGround) {
    vy = 15;
    onGround = false;
  }
});

function startGame() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  score = 0;
  lives = 3;
  currentLevel = 0;
  document.getElementById('score').textContent = 'Очки: ' + score;
  document.getElementById('lives-counter').textContent = 'Жизни: ' + lives;
  loadLevel(currentLevel);
  update();
}

function restartGame() {
  location.reload();
}

function loadLevel(index) {
  const level = levels[index];
  if (!level) {
    showVictoryScreen();
    return;
  }

  clearGameField();
  enemiesList = [];

  level.platforms.forEach(p => createPlatform(p.x, p.y, p.width));
  level.enemies.forEach(e => createEnemy(e.x, e.y));
  eggsTotal = level.eggs.length;
  eggsCollected = 0;
  level.eggs.forEach(e => createEgg(e.x, e.y));

  document.getElementById('level-counter').textContent = 'Уровень: ' + (index + 1);
}

function nextLevel() {
  currentLevel++;
  loadLevel(currentLevel);
}

function showVictoryScreen() {
  document.getElementById('game').style.display = 'none';
  document.getElementById('final-win').style.display = 'flex';
}

function clearGameField() {
  document.querySelectorAll('.platform, .enemy, .egg').forEach(el => el.remove());
}

function createPlatform(x, y, width) {
  const platform = document.createElement('div');
  platform.className = 'platform';
  platform.style.left = x + 'px';
  platform.style.bottom = y + 'px';
  platform.style.width = width + 'px';
  document.getElementById('game').appendChild(platform);
}

function createEnemy(x, y) {
  const enemy = document.createElement('div');
  enemy.className = 'enemy';
  enemy.style.left = x + 'px';
  enemy.style.bottom = y + 'px';
  document.getElementById('game').appendChild(enemy);

  enemiesList.push({ element: enemy, x: x, y: y, speed: 2 });
}

function createEgg(x, y) {
  const egg = document.createElement('div');
  egg.className = 'egg';
  egg.style.left = x + 'px';
  egg.style.bottom = y + 'px';
  document.getElementById('game').appendChild(egg);

  egg.addEventListener('click', () => collectEgg(egg));
  egg.addEventListener('touchstart', () => collectEgg(egg));
}

function collectEgg(egg) {
  egg.remove();
  eggsCollected++;
  score += 10;
  document.getElementById('score').textContent = 'Очки: ' + score;
  if (eggsCollected >= eggsTotal) {
    setTimeout(() => nextLevel(), 500);
  }
}

function loseGame() {
  lives--;
  if (lives > 0) {
    document.getElementById('lives-counter').textContent = 'Жизни: ' + lives;
    setTimeout(() => loadLevel(currentLevel), 1000);
  } else {
    document.getElementById('game').style.display = 'none';
    document.getElementById('lose').style.display = 'flex';
  }
}

function moveEnemies() {
  enemiesList.forEach(enemy => {
    enemy.x += enemy.speed;
    if (enemy.x > window.innerWidth - 40 || enemy.x < 0) {
      enemy.speed *= -1;
    }
    enemy.element.style.left = enemy.x + 'px';

    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();
    if (playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top) {
      loseGame();
    }
  });
}

function update() {
  if (moveRight) x += 5;
  if (moveLeft) x -= 5;

  vy -= 0.8;
  y += vy;
  if (y <= 0) {
    y = 0;
    vy = 0;
    onGround = true;
  }

  player.style.left = x + 'px';
  player.style.bottom = y + 'px';

  moveEnemies();

  requestAnimationFrame(update);
}
