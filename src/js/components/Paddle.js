import { c } from "./config"


class Paddle {
    constructor( {position}, color) {
      this.position = position
      this.color = color
      this.velocity = {
        x: 0,
        y: 0,
      }
      this.width = 10
      this.height = 100
    }

    draw() {
      c.fillStyle = this.color
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
      this.draw()

      if (
        this.position.y + this.velocity.y > 0 &&
        this.position.y + this.height + this.velocity.y < c.height
      )
        this.position.y += this.velocity.y
    }

    enlargeForDuration(duration) {
      // Enlarge the paddle for the specified duration
      const originalHeight = this.height
      this.height *= 1.5

      // Reset to the original height after the duration
      setTimeout(() => {
          this.height = originalHeight
      }, duration * 1000)
    }
}

export default Paddle