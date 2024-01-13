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

paddle1.draw()
paddle2.draw()


