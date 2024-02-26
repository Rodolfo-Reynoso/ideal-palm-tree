import { c, canvas } from "./Config"


class Paddle {
    constructor( {position}, color, letter) {
      this.position = position
      this.color = color
      this.velocity = {
        x: 0,
        y: 0,
      }
      this.letter = letter
      this.width = 10
      this.height = 100
    }

    draw() {
      c.fillStyle = this.color

      c.font = "150px sans-serif"


      if(this.letter == 'j' || this.letter == 'J') {
        c.textBaseline = "top"
        // fill text x position is a manual based input that only works for the 150px font size
        c.fillText("J", this.position.x * 2 + 30, this.position.y )
        let measureText = c.measureText("J")
        this.width = measureText.width
        this.height = measureText.actualBoundingBoxDescent

        c.strokeStyle = 'red'; // Set the stroke color to blue
        c.strokeRect(this.position.x, this.position.y, this.width, this.height);


      } else if (this.letter == 'n' || this.letter == 'N') {
        c.fillText("N", this.position.x, this.position.y)
        let measureText = c.measureText("N")
        c.textAlign = "left"
        this.width = c.measureText("N").actualBoundingBoxRight
        c.strokeStyle = 'red'; // Set the stroke color to blue
        this.height = measureText.actualBoundingBoxDescent
        c.strokeRect(canvas.width - this.width, this.position.y, this.width, this.height);

      } else {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
      }


    }

    update() {
      this.draw()

      if (
        this.position.y + this.velocity.y > 0 &&
        this.position.y + this.height + this.velocity.y < canvas.height
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