// Variables
var canvas, context;
var birdX, birdY, birdSpeed;
var gravity;
var gapHeight, gapWidth;
var gapX, gapY;
var score;
var gameStarted;
var gameOver;

// Initialization
function init() {
  canvas = document.getElementById('gameCanvas');
  context = canvas.getContext('2d');
  canvas.width = 1280;
  canvas.height = 720;

  birdX = canvas.width / 3;
  birdY = canvas.height / 2;
  birdSpeed = 0;
  gravity = 0.20;

  gapHeight = 120;
  gapWidth = 80;
  gapX = canvas.width;
  gapY = Math.random() * (canvas.height - gapHeight);

  score = 0;
  gameStarted = false;
  gameOver = false;

  // Event listeners
  document.addEventListener('keydown', handleKeyDown);
  canvas.addEventListener('mousedown', handleMouseDown);
}

// Update game logic
function update() {
  if (!gameStarted || gameOver) {
    return;
  }

  birdY += birdSpeed;
  birdSpeed += gravity;

  gapX -= 2;

  if (birdY < 0 || birdY > canvas.height) {
    endGame();
  }

  if (gapX + gapWidth < 0) {
    gapX = canvas.width;
    gapY = Math.random() * (canvas.height - gapHeight);
    score++;
  }

  if (
    birdX + 20 > gapX &&
    birdX < gapX + gapWidth &&
    (birdY < gapY || birdY + 20 > gapY + gapHeight)
  ) {
    endGame();
  }
}

// Render the game
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  var birdImage = document.getElementById('birdImage');
  context.drawImage(birdImage, birdX, birdY, 30, 30);

  // Draw gap
  context.fillStyle = '#68c542';
  context.fillRect(gapX, 0, gapWidth, gapY);
  context.fillRect(gapX, gapY + gapHeight, gapWidth, canvas.height - gapY - gapHeight);

  // Draw score
  context.fillStyle = '#ffffff';
  context.font = '24px Arial';
  context.fillText('Score: ' + score, 10, 30);

  if (!gameStarted) {
    context.fillStyle = '#ffffff';
    context.font = '36px Arial';
    context.fillText('Click to Start', canvas.width / 2 - 100, canvas.height / 2);
    context.fillText('Press Space to Jump', canvas.width / 2 - 100, canvas.height / 3 * 2);
  }

  if (gameOver) {
    context.fillStyle = '#ffffff';
    context.font = '36px Arial';
    context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2 - 30);
    context.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 30);

    // Draw restart button
    context.fillStyle = '#b82e47';
    context.fillRect(canvas.width / 2 - 60, canvas.height / 2 + 60, 120, 40);

    context.fillStyle = '#ffffff';
    context.font = '24px Arial';
    context.fillText('Restart', canvas.width / 2 - 40, canvas.height / 2 + 85);
  }
}

// Game loop
function gameLoop() {
  update();
  render();

  requestAnimationFrame(gameLoop);
}

// Handle bird flap
function flapBird() {
  birdSpeed = -5;
}

// Handle key down event
function handleKeyDown(event) {
  if (event.code === 'Space') {
    if (!gameStarted) {
      startGame();
    } else if (!gameOver) {
      flapBird();
    }
  }
}

// Handle mouse down event
function handleMouseDown() {
  if (!gameStarted) {
    startGame();
  } else if (!gameOver) {
    flapBird();
  } else {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    if (
      clickX >= canvas.width / 2 - 60 &&
      clickX <= canvas.width / 2 + 60 &&
      clickY >= canvas.height / 2 + 60 &&
      clickY <= canvas.height / 2 + 100
    ) {
      restartGame();
    }
  }
}

// Start the game
function startGame() {
  gameStarted = true;
}

// Restart the game
function restartGame() {
  gameStarted = true;
  gameOver = false;

  birdX = canvas.width / 3;
  birdY = canvas.height / 2;
  birdSpeed = 0;
  score = 0;
  gapX = canvas.width;
  gapY = Math.random() * (canvas.height - gapHeight);
}

// End the game
function endGame() {
  gameOver = true;
}

// Start the game
init();
gameLoop();
