const posIsObstacle = (x, y) => x < 0 || x >= COLS || y < 0 || y >= ROWS
const touchesOwnTail = (x, y) => {
  for (let i = 0; i < snake.length - 2; i += 1) {
    const current = snake[i]
    if (current.posX === x && current.posY === y) {
      return true
    }
  }

  return false
}

const hasObstacleInFront = head => {
  // moving horizontally
  if (head.dirX !== 0) {
    const nextX = head.posX + head.dirX
    const nextY = head.posY
    return posIsObstacle(nextX, nextY) || touchesOwnTail(nextX, nextY)
  }
  // moving vertically
  if (head.dirY !== 0) {
    const nextX = head.posX
    const nextY = head.posY + head.dirY
    return posIsObstacle(nextX, nextY) || touchesOwnTail(nextX, nextY)
  }

  return false
}

const hasObstacleOnLeft = head => {
  if (head.dirX !== 0) {
    const nextX = head.posX
    const nextY = head.posY - head.dirX
    return posIsObstacle(nextX, nextY) || touchesOwnTail(nextX, nextY)
  }
  if (head.dirY !== 0) {
    const nextX = head.posX + head.dirY
    const nextY = head.posY
    return posIsObstacle(nextX, nextY) || touchesOwnTail(nextX, nextY)
  }

  return false
}

const hasObstacleOnRight = head => {
  if (head.dirX !== 0) {
    const nextX = head.posX
    const nextY = head.posY + head.dirX
    return posIsObstacle(nextX, nextY) || touchesOwnTail(nextX, nextY)
  }
  if (head.dirY !== 0) {
    const nextX = head.posX - head.dirY
    const nextY = head.posY
    return posIsObstacle(nextX, nextY) || touchesOwnTail(nextX, nextY)
  }

  return false
}

// Returns a number between -1 and 1 based on the foods location
const getSuggestedDirection = head => {
  if (head.dirX === 1) {
    if (food.foodX <= head.posX && food.foodY <= head.posY) return -1
    if (food.foodX <= head.posX && food.foodY >= head.posY) return 1
    return 0
  }
  if (head.dirX === -1) {
    if (food.foodX >= head.posX && food.foodY <= head.posY) return 1
    if (food.foodX >= head.posX && food.foodY >= head.posY) return -1
    return 0
  }
  if (head.dirY === 1) {
    if (food.foodX >= head.posX && food.foodY <= head.posY) return -1
    if (food.foodX <= head.posX && food.foodY <= head.posY) return 1
    return 0
  }
  if (head.dirY === -1) {
    if (food.foodX >= head.posX && food.foodY >= head.posY) return 1
    if (food.foodX <= head.posX && food.foodY >= head.posY) return -1
    return 0
  }
  return 0
}

// 1 stand for an obstacle, 0 means there is nothing
// returns an array containing [left, front, right]
// Example [0, 1, 1] means there is an obstacle in the front and on the right
const possibleDirections = head => {
  const front = hasObstacleInFront(head) ? 1 : 0
  const left = hasObstacleOnLeft(head) ? 1 : 0
  const right = hasObstacleOnRight(head) ? 1 : 0
  const suggestedDirection = getSuggestedDirection(head)

  return [left, front, right, suggestedDirection]
}

let lastTurn = -1

const chooseDirection = () => {
  const head = snake[snake.length - 1]
  const [left, front, right, suggestedDirection] = possibleDirections(head)

  let finalDirection
  if (suggestedDirection === -1 && left === 0) {
    lastTurn = -1
    finalDirection = -1
  } else if (suggestedDirection === 0 && front === 0) {
    finalDirection = 0
  } else if (suggestedDirection === 1 && right === 0) {
    lastTurn = 1
    finalDirection = 1
  }
  if (finalDirection === undefined) {
    if (left === 0 && lastTurn !== -1) {
      lastTurn = -1
      finalDirection = -1
    } else if (right === 0 && lastTurn !== 1) {
      lastTurn = 1
      finalDirection = 1
    } else if (front === 0) finalDirection = 0

    // If the opposite of the last turn wasn't available we need
    // to check for an available direction
    if (finalDirection === undefined) {
      if (left === 0) {
        lastTurn = -1
        finalDirection = -1
      } else if (right === 0) {
        lastTurn = 1
        finalDirection = 1
      } else finalDirection = 0
    }
  }

  if (finalDirection === -1) {
    // Go left
    if (head.dirX !== 0) {
      head.dirY = -head.dirX
      head.dirX = 0
    } else if (head.dirY !== 0) {
      head.dirX = head.dirY
      head.dirY = 0
    }
  } else if (finalDirection === 0) {
    // Go front, don't update anything
  } else if (finalDirection === 1) {
    // Go right
    if (head.dirX !== 0) {
      head.dirY = head.dirX
      head.dirX = 0
    } else if (head.dirY !== 0) {
      head.dirX = -head.dirY
      head.dirY = 0
    }
  }
}
