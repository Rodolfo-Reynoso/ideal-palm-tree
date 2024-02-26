import "../styles/main.sass"

import { c, canvas } from './components/Config'
import Paddle from "./components/Paddle"
import Box from "./components/Box"

// let player = prompt("Please enter your name", "Player 1");
let player = "Player 1";

let leftScore = 0
let rightScore = 0
let leftSetScore = 0
let rightSetScore = 0
let maxGameScore = 2
const hasbullahLaugh = new Audio("https://www.myinstants.com/media/sounds/hasbulla-laugh.mp3")


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
    c.font = "50px sans-serif"
    let measureBallText = c.measureText("OH")
    // console.log(measureBallText)


    this.width = measureBallText.width;
    this.height = measureBallText.actualBoundingBoxDescent

 

    c.fillText("OH", this.position.x, this.position.y)



  }

  update() {
    this.draw()

    // Draw the collision box
    c.strokeStyle = 'red'; // Set the stroke color to blue
    c.strokeRect(this.position.x, this.position.y, this.width, this.height);
    c.font = "25px sans-serif"
    // c.fillStyle = "green"
    c.fillText(`x:${this.position.x},y:${this.position.y}`, this.position.x, this.position.y - 50)


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

      if (box.collisionsRemaining === 0) {
          // Box disappears after 3 collisions
          box.collisionsRemaining = 3; // Reset collisions count
          box.position.y = -box.height; // Move the box off-screen


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
          } else if (this.position.x + this.velocity.x > canvas.width) {
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
    }

    // paddle 2 collision
    if (
      // I don't know why the + 45 is needed. It should be figured out. Currently
      // with out the +45 the ball will go halfway through the N before it detects a collision.
      rightSide + 45 >= paddle2.position.x &&
      bottomSide >= paddle2.position.y &&
      topSide <= paddle2.position.y + paddle2.height
    ) {

      console.log(`Paddle 2 X Position: ${paddle2.position.x}`)
      console.log(`Ball X Right Position: ${this.position.x + this.width }`)

      this.velocity.x = -this.velocity.x
      this.lastPaddleHit = paddle2;
      console.log("I was hit")

      
    }

    // reverse y directions
    if (
      this.position.y + this.height + this.velocity.y >= canvas.height ||
      this.position.y + this.velocity.y <= 0
    ) {
      this.velocity.y = -this.velocity.y
    }

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

const box = new Box({
    position: {
        x: (canvas.width) / 2,
        y: (canvas.height) / 4,

    },
}, 'yellow');

  

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
    c.textAlign = 'center'
    c.fillText(player, canvas.width / 2 - 200, 50)
    c.fillText(`Skynet`, canvas.width / 2 + 200, 50)
    c.fillText(`${leftSetScore}:${leftScore}`, canvas.width / 2 - 170, 100)
    c.fillText(`${rightSetScore}:${rightScore}`, canvas.width / 2 + 230, 100)

}

function resetBall() {
    // Reset ball position to the center of the canvas

    let randomValue = Math.random()
    let probability = .2

    if(randomValue < probability) {
      hasbullahLaugh.play()
    }

    ball.position.x = canvas.width / 2;
    ball.position.y = canvas.height / 2;

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
      y: 200,
      color: 'white'
    },
    },'white',
    'j')

    console.log(paddle1)
    
  const paddle2 = new Paddle({
    position: {
      x: canvas.width - (108 / 2),
      y: 100,
      
    },
  }, 'green',
  'n')

  console.log(paddle2)

  const ball = new Ball({
    position: {
      x: canvas.width / 2,
      y: canvas.height / 2,
    },
  })

  function computerAI() {
    const speed = 3;
  
    // Adjust the computer paddle's position based on the ball's position
    if (paddle2.position.y + paddle2.height / 2 < Math.round(ball.position.y)) {
      paddle2.velocity.y = speed;
    } else if (paddle2.position.y + paddle2.height / 2 > Math.round(ball.position.y)) {
      paddle2.velocity.y = -speed;
    } else {
      paddle2.velocity.y = 0;
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgb(2,0,36)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    paddle1.update()

    paddle2.update()
    // paddle2.draw()
    computerAI()
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

      // case 'ArrowUp':
      //   // go up
      //   paddle2.velocity.y = -speed
      //   break
      // case 'ArrowDown':
      //   // go down
      //   paddle2.velocity.y = speed
      //   break
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






