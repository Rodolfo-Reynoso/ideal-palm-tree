const canvas = document.querySelector('.canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Paddle {
    constructor({position}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 10
        this.height = 100
    }

    draw() {
        c.fillStyle= 'white'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
    }
}

const paddle1 = new Paddle({
    position: {
        x: 10,
        y: 100
    }
})

const paddle2 = new Paddle({
    position: {
        x:  canvas.width - 10 *2,
        y: 100
    }
})



function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgb(2,0,36)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    paddle1.update()
    paddle2.update()
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


