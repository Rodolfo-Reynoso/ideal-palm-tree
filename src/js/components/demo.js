let player1Position = 0
let player2Position = 0
let playerMovementSpeed = 10
let player1 = document.getElementById("controllerPlayer1")
let player2 = document.getElementById("controllerPlayer2")


function isColliding(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

if(isColliding(player1, player2)) {
  console.log("Elements are colliding")
} else {
  console.log("Elements are not colliding")
}
 

window.addEventListener("keydown",
    (event) => {
     
      // Player 1
      if(event.code == 'KeyW') {
        player1Position -=playerMovementSpeed
        player1.style.transform = `translateY(${player1Position}px)`
      }
      if(event.code == 'KeyS') {
        player1Position +=playerMovementSpeed
        player1.style.transform = `translateY(${player1Position}px)`

      }

      // Player 2
      if(event.code == 'ArrowUp') {

        player2Position -=playerMovementSpeed
        player2.style.transform = `translateY(${player2Position}px)`
      }
      if(event.code == 'ArrowDown') {

        player2Position +=playerMovementSpeed
        player2.style.transform = `translateY(${player2Position}px)`
      }

    }
  );

