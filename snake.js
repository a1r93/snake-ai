const drawSnake = () => {
  for (let i = 0; i < snake.length; i += 1) {
    const current = snake[i]

    fill(SNAKE_COLOR)
    stroke(BACKGROUND_COLOR)
    const x = current.posX * blockWidth
    const y = current.posY * blockHeight
    rect(x, y, blockWidth, blockHeight)
  }

  const head = snake[snake.length - 1]
  const x = head.posX * blockWidth
  const y = head.posY * blockHeight
  const centerX = x + blockWidth / 2
  const centerY = y + blockHeight / 2

  // Draw an eye and a small mouth for the snake
  fill("white")
  stroke(BACKGROUND_COLOR)
  switch (true) {
    // Going right
    case head.dirX === 1: {
      circle(x + 7, y + 6, 2)
      line(centerX + 3, centerY + 2, x + blockWidth, centerY + 3)
      break
    }
    // Going left
    case head.dirX === -1: {
      circle(x + blockWidth - 7, y + 6, 2)
      line(centerX - 3, centerY + 2, x, centerY + 3)
      break
    }
    // Going bottom
    case head.dirY === 1: {
      circle(x + blockWidth - 7, y + 6, 2)
      line(centerX - 2, centerY + 3, centerX - 3, y + blockHeight)
      break
    }
    // Going top
    case head.dirY === -1: {
      circle(x + 6, y + blockHeight - 7, 2)
      line(centerX + 2, centerY - 3, centerX + 3, y)
      break
    }
    default:
      break
  }

  // Draw a mouth open for the snake when next to food
  if (
    head.posX + head.dirX === food.foodX &&
    head.posY + head.dirY === food.foodY
  ) {
    fill(BACKGROUND_COLOR)
    noStroke()
    switch (true) {
      // Going right
      case head.dirX === 1: {
        const x1 = x + blockWidth
        const y1 = y
        const x2 = x + blockWidth
        const y2 = y + blockHeight
        triangle(x1, y1, x2, y2, centerX, centerY)
        break
      }
      // Going left
      case head.dirX === -1: {
        const x1 = x
        const y1 = y
        const x2 = x
        const y2 = y + blockHeight
        triangle(x1, y1, x2, y2, centerX, centerY)
        break
      }
      // Going bottom
      case head.dirY === 1: {
        const x1 = x
        const y1 = y + blockHeight
        const x2 = x + blockWidth
        const y2 = y + blockHeight
        triangle(x1, y1, x2, y2, centerX, centerY)
        break
      }
      // Going top
      case head.dirY === -1: {
        const x1 = x
        const y1 = y
        const x2 = x + blockWidth
        const y2 = y
        triangle(x1, y1, x2, y2, centerX, centerY)
        break
      }
      default:
        break
    }
  }
}

// Updates the snakes position based on its direction
const updateSnakePositions = () => {
  let previous
  for (let i = snake.length - 1; i >= 0; i -= 1) {
    const current = snake[i]
    if (!previous) {
      previous = { ...current }
      current.posX += current.dirX
      current.posY += current.dirY
    } else {
      const tmp = { ...current }
      current.posX = previous.posX
      current.posY = previous.posY
      current.dirX = previous.dirX
      current.dirY = previous.dirY
      previous = tmp
    }
  }
}

const checkIfDead = () => {
  const head = snake[snake.length - 1]

  // Check if the snake hit a wall
  if (
    head.posX < 0 ||
    head.posX >= COLS ||
    head.posY < 0 ||
    head.posY >= ROWS
  ) {
    return true
  }

  // Check if the snake hit his tail
  for (let i = 0; i < snake.length - 2; i += 1) {
    const current = snake[i]
    if (current.posX === head.posX && current.posY === head.posY) {
      return true
    }
  }

  return false
}

// Check if the snake should eat the food and spawn a new food
// if so
const eatFood = () => {
  const head = snake[snake.length - 1]
  if (food.foodX === head.posX && food.foodY === head.posY) {
    const currentTail = snake[0]
    const { posX, posY, dirX, dirY } = currentTail
    const newTail = getPart(posX - dirX, posY - dirY, dirX, dirY)
    snake = [newTail, ...snake]
    food = dropFood()
    score += prevValue
  }
}
