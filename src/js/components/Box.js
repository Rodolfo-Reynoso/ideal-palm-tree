import { canvas, c } from "./Config" 

class Box {
    constructor({ position }, color) {
      this.position = position;
      this.color = color;
      this.width = 200;
      this.height = 200;
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
      if (this.position.y <= 0 || this.position.y + this.height >= canvas.height) {
          this.direction *= -1;
      }
    }

}

export default Box