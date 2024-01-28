import "../styles/main.sass"

import { c, canvas, initializeCanvas ,initCanvasOnDOMReady } from './components/config'
import Paddle from "./components/Paddle"

// initCanvasOnDOMReady()

// const canvas = document.querySelector('.canvas')
// const c = canvas.getContext('2d')

// c.width = window.innerWidth
// c.height = window.innerHeight

console.log(`Variable C: ${c.width}`)

console.log(window.innerWidth)
console.log("hello world")

let leftScore = 0
let rightScore = 0
let leftSetScore = 0
let rightSetScore = 0
let maxGameScore = 2
const hasbullahLaugh = new Audio("https://www.myinstants.com/media/sounds/hasbulla-laugh.mp3")


  class Box {
    constructor({ position }, color) {
      this.position = position;
      this.color = color;
      this.width = 200;
      this.height = 20;
      this.collisionsRemaining = 3; // Number of collisions before the box disappears
      this.direction = 1; // 1 represents moving down, -1 represents moving up
      this.moveDistance = 100; // Distance to move up or down
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
      // Update the box's position based on direction
      this.position.y += this.direction * this.moveDistance;

      // Reverse direction if the box reaches the top or bottom
      if (this.position.y <= 0 || this.position.y + this.height >= c.height) {
          this.direction *= -1;
      }
    }

}

console.log(c)
const box = new Box({
    position: {
        x: (c.width) / 2,
        y: (c.height) / 6,

    },
}, 'yellow');

  class Ball {
    constructor({ position }) {
      this.position = position

      const speed = 2
      const direction = {
        x: Math.random() - 0.5 >= 0 ? -speed : speed,
        y: Math.random() - 0.5 >= 0 ? -speed : speed,
      }
      this.velocity = {
        x: direction.x,
        y: direction.y,
      }

      this.width = 40
      this.height = 40

      this.lastPaddleHit = null; // To keep track of the last paddle hit
    }

    draw() {
      c.fillStyle = 'white'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
      this.draw()

      // Check if the ball collides with the box
      if (
        this.position.x < box.position.x + box.width &&
        this.position.x + this.width > box.position.x &&
        this.position.y < box.position.y + box.height &&
        this.position.y + this.height > box.position.y
    ) {
        // Ball collides with the box
        this.velocity.y = -this.velocity.y; // Reverse the y-direction
        box.collisionsRemaining--;
        console.log(`Collisions Remaining: ${box.collisionsRemaining}`)
        console.log(`Last paddle hit: ${this.lastPaddleHit}`)

        if (box.collisionsRemaining === 0) {
            // Box disappears after 3 collisions
            box.collisionsRemaining = 3; // Reset collisions count
            box.position.y = -box.height; // Move the box off-screen

            console.log(`Last paddle hit is: ${this.lastPaddleHit}`)
            // Enlarge the last paddle hit for 5 seconds
            if (this.lastPaddleHit) {
              this.lastPaddleHit.enlargeForDuration(15);
              console.log(`${this.lastPaddleHit}`)
            
          }
        }
    }


              // Check if the ball went off-screen
              if (this.position.x + this.width + this.velocity.x < 0) {
                // Ball goes off to the left, increment rightScore
                rightScore++;
                updateScores();
                resetBall();
            } else if (this.position.x + this.velocity.x > c.width) {
                // Ball goes off to the right, increment leftScore
                leftScore++;
                updateScores();
                resetBall();
            }

            updateScores()


      const rightSide = this.position.x + this.width + this.velocity.x
      const leftSide = this.position.x + this.velocity.x
      const bottomSide = this.position.y + this.height
      const topSide = this.position.y

      // paddle 1 collision
      if (
        leftSide <= paddle1.position.x + paddle1.width &&
        bottomSide >= paddle1.position.y &&
        topSide <= paddle1.position.y + paddle1.height
      ) {
        this.velocity.x = -this.velocity.x
        this.lastPaddleHit = paddle1;
          console.log(`paddle1 is hit: ${this.lastPaddleHit}`)
      }

      // paddle 2 collision
      if (
        rightSide >= paddle2.position.x &&
        bottomSide >= paddle2.position.y &&
        topSide <= paddle2.position.y + paddle2.height
      ) {
        this.velocity.x = -this.velocity.x
        this.lastPaddleHit = paddle2;
        console.log(`paddle2 is hit: ${this.lastPaddleHit}`)
      }

      // reverse y directions
      if (
        this.position.y + this.height + this.velocity.y >= c.height ||
        this.position.y + this.velocity.y <= 0
      ) {
        this.velocity.y = -this.velocity.y
      }

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }

  function updateScores() {
    // Update the scores displayed on the canvas
    // You can modify this part based on how you want to display scores

    if (leftScore == maxGameScore) {
      leftSetScore++
      leftScore = 0
      rightScore = 0
    }

    if (rightScore == maxGameScore) {
      rightSetScore++
      leftScore = 0
      rightScore = 0

    }

    c.font = "30px Arial"
    c.fillText(`Player 1`, c.width / 2 - 200, 50)
    c.fillText(`Player 2`, c.width / 2 + 200, 50)
    c.fillText(`${leftSetScore}:${leftScore}`, c.width / 2 - 170, 100)
    c.fillText(`${rightSetScore}:${rightScore}`, c.width / 2 + 230, 100)

}

function resetBall() {
    // Reset ball position to the center of the canvas

    let randomValue = Math.random()
    let probability = .5

    if(randomValue < probability) {
      hasbullahLaugh.play()
    }

    ball.position.x = c.width / 2;
    ball.position.y = c.height / 2;

    // Set velocity to zero (stop moving)
    ball.velocity.x = 0;
    ball.velocity.y = 0;

    // Insert Hasbullah laugh here

    // Set a timeout to wait for 3 seconds before moving the ball again
    setTimeout(() => {
        // Randomize ball direction after the timeout
        const speed = 2;
        const direction = {
            x: Math.random() - 0.5 >= 0 ? -speed : speed,
            y: Math.random() - 0.5 >= 0 ? -speed : speed,
        };

        // Set the new velocity
        ball.velocity.x = direction.x;
        ball.velocity.y = direction.y;
    }, 3000);
}

// Call updateScores() initially to display initial scores
updateScores();


  const paddle1 = new Paddle({
    position: {
      x: 10,
      y: 100,
      color: 'white'
    },
    },'white')

  const paddle2 = new Paddle({
    position: {
      x: c.width - 10 * 2,
      y: 100,
      
    },
  }, 'green')

  const ball = new Ball({
    position: {
      x: c.width / 2,
      y: c.height / 2,
    },
  })

  function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgb(2,0,36)'
    c.fillRect(0, 0, c.width, c.height)
    paddle1.update()
    paddle2.update()

    ball.update()
    box.draw();
  }

  animate()


addEventListener('keydown', (event) => {
    const speed = 6
    switch (event.key) {
      case 'w':
        // go up
        paddle1.velocity.y = -speed
        break
      case 's':
        // go down
        paddle1.velocity.y = speed
        break

      case 'ArrowUp':
        // go up
        paddle2.velocity.y = -speed
        break
      case 'ArrowDown':
        // go down
        paddle2.velocity.y = speed
        break
    }
  })


  addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'w':
        // go up
        paddle1.velocity.y = 0
        break
      case 's':
        // go down
        paddle1.velocity.y =0
        break

      case 'ArrowUp':
        // go up
        paddle2.velocity.y = 0
        break
      case 'ArrowDown':
        // go down
        paddle2.velocity.y =0
        break
    }
  })






