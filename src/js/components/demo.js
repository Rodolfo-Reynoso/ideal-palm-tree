let player1Position = 0
let player2Position = 0
let playerMovementSpeed = 10
let player1 = document.getElementById("controllerPlayer1")
let player2 = document.getElementById("controllerPlayer2")


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

