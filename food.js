// Drops the food on a random location
const dropFood = () => {
  let x = getRandom(0, COLS)
  let y = getRandom(0, ROWS)

  // Check if the location isn't on the snake
  while (
    snake &&
    snake.findIndex(({ posX, posY }) => posX === x && posY === y) !== -1
  ) {
    x = getRandom(0, COLS)
    y = getRandom(0, ROWS)
  }
  return {
    foodX: x,
    foodY: y
  }
}

let food = dropFood()

const drawFood = () => {
  fill(SNAKE_COLOR)
  noStroke()
  const { foodX, foodY } = food
  const x = foodX * blockWidth
  const y = foodY * blockHeight
  const centerX = x + blockWidth / 2
  const centerY = y + blockHeight / 2
  circle(centerX, centerY, blockWidth / 5)

  stroke(SNAKE_COLOR)
  strokeWeight(2)
  const rightX = x + blockWidth - 2
  const rightY = centerY
  const topX = centerX
  const topY = y + 2
  const leftX = x + 2
  const leftY = centerY
  const bottomX = centerX
  const bottomY = y + blockHeight - 2
  // Top to right
  line(topX, topY, rightX, rightY)

  // Right to bottom
  line(rightX, rightY, bottomX, bottomY)

  // Bottom to left
  line(bottomX, bottomY, leftX, leftY)

  // Left to top
  line(leftX, leftY, topX, topY)
}
