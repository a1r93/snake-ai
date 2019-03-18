let lost = false

let score = 0

const printScore = () => {
  fill(255)
  textSize(35)
  text(score, WIDTH - 45, 45)
}

const drawMenu = () => {
  fill("rgba(0, 0, 0, 0.7)")
  rect(0, 0, WIDTH, HEIGHT)

  fill(200)

  const w = menuWidth * 2
  const h = menuHeight * 2

  rect(menuX, menuY, w, h)

  fill(30)
  textSize(35)
  textAlign(CENTER)
  text("Play again", menuX + menuWidth, menuY + menuHeight + 10)

  fill(200)
  text(`Score: ${score}`, menuX + menuWidth, menuY + menuHeight * 4)
}

const restartGame = () => {
  lost = false
  snake = getInitialSnake(8, snakeSize, 15)
  score = 0
  loop()
}

let canPress = true

// Set the direction of the snake based on the users input direction
function keyPressed(e) {
  if (!canPress) {
    return
  }
  const { key } = e
  const { length } = snake
  const head = snake[length - 1]

  switch (key) {
    case "ArrowLeft":
      if (head.dirX !== 1) {
        head.dirX = -1
        head.dirY = 0
      }
      break
    case "ArrowRight":
      if (head.dirX !== -1) {
        head.dirX = 1
        head.dirY = 0
      }
      break
    case "ArrowUp":
      if (head.dirY !== 1) {
        head.dirY = -1
        head.dirX = 0
      }
      break
    case "ArrowDown":
      if (head.dirY !== -1) {
        head.dirY = 1
        head.dirX = 0
      }
      break
    case " ":
    case "Enter":
      if (lost) {
        restartGame()
      }
    default:
      break
  }

  // Add a small timeout in order to not make the snake go
  // backwards and die stupidly
  canPress = false
  setTimeout(() => {
    canPress = true
  }, 50)
}

// Add a listener when the menu is open to catch the restart of
// the game
function mousePressed(e) {
  if (lost) {
    const { clientX, clientY } = e
    const w = menuWidth * 2
    const h = menuHeight * 2

    if (
      clientX >= menuX &&
      clientX <= menuX + w &&
      clientY >= menuY &&
      clientY <= menuY + h
    ) {
      restartGame()
    }
  }
}

let prevValue

// Updates the level if it has changed
updateLevel = () => {
  const levelInput = document.getElementById("level-input")
  const level = parseInt(levelInput.value, 10) || 5
  levelInput.blur()
  if (level !== prevValue) {
    frameRate(level * 3)
    prevValue = level
    restartGame()
  }
}

// Updates the starting size of the snake
updateSnakeSize = () => {
  const tailInput = document.getElementById("tail-size")
  snakeSize = parseInt(tailInput.value, 10) || 7
  tailInput.blur()
  restartGame()
}

let aiPlaying = false
// If checked, it lets the ai play
toggleAiPlaying = () => {
  const aiPlayInput = document.getElementById("ia-play")
  aiPlaying = aiPlayInput.checked
  aiPlayInput.blur()
  restartGame()
}

function setup() {
  createCanvas(WIDTH, HEIGHT)

  // Level setup
  const levelInput = document.getElementById("level-input")
  const level = parseInt(levelInput.value, 10) || 5
  levelInput.addEventListener("change", updateLevel)
  prevValue = level
  frameRate(level * 3)

  // Snake length
  const tailInput = document.getElementById("tail-size")
  snakeSize = parseInt(tailInput.value, 10) || 7
  tailInput.addEventListener("change", updateSnakeSize)

  // Let the ai play
  const aiPlayInput = document.getElementById("ia-play")
  aiPlaying = aiPlayInput.checked
  aiPlayInput.addEventListener("change", toggleAiPlaying)
}

function draw() {
  background(BACKGROUND_COLOR)
  printScore()
  drawFood()
  drawSnake()

  if (aiPlaying) {
    chooseDirection()
  }

  if (checkIfDead()) {
    lost = true
    drawMenu()
    noLoop()
  } else {
    updateSnakePositions()
    eatFood()
  }
}
