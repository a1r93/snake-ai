const BACKGROUND_COLOR = "rgb(111, 174, 182)"
const SNAKE_COLOR = "rgb(16, 60, 64)"
const WIDTH = 600
const HEIGHT = 500
const COLS = 30
const ROWS = 25
const blockWidth = Math.round(WIDTH / COLS)
const blockHeight = Math.round(HEIGHT / ROWS)
const menuWidth = 100
const menuHeight = 35
const menuX = WIDTH / 2 - menuWidth
const menuY = HEIGHT / 2 - menuHeight
let snakeSize = 7

const getPart = (x, y, dX, dY) => ({
  posX: x,
  posY: y,
  dirX: dX,
  dirY: dY
})

const getInitialSnake = (from, size, y) => {
  const queue = []
  for (let i = 0; i < size; i += 1) {
    const x = from + i
    queue.push(getPart(x, y, 1, 0))
  }
  return queue
}

// Snake
let snake = getInitialSnake(8, snakeSize, 15)
