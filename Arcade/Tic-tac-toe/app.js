const gameState = {
  players: ['X', 'O'],
  board: [
    null, null, null,
    null, null, null,
    null, null, null
  ]
}


let playerOne = "";
let playerTwo = "";
const x = gameState.players[0];
const o = gameState.players[1];
let turnCounter = 0;
let playerOneWins = 0;
let playerTwoWins = 0;
let currentPlayer = gameState.players[Math.floor(Math.random()*2)];
$('.playerScore').text(playerOneWins);
$('.cpuScore').text(playerTwoWins);       


function choosePlayers () {
  playerOne = prompt('Player 1 name:');
  if (playerOne === null) {
    playerOne = 'Player';
  }
  $('.player1').text(`${playerOne}'s Wins`);
  playerTwo = prompt('Player 2 name. Enter Cpu for singleplayer')
  if(playerTwo.toUpperCase() === 'CPU'|| playerTwo.toUpperCase() === 'COMPUTER') {
    playerTwo = 'CPU'
  }
  $('.player2').text(`${playerTwo}'s Wins`);
  announceStartingPlayer()
}


function announceStartingPlayer() {
  if (currentPlayer === o) {
    $('.turncontrol').text(`${playerTwo} is O and goes first!`);
    if (playerTwo === 'CPU') {
      return computerPlayer();
    }
  }
  if (currentPlayer === x) {
    $('.turncontrol').text(`${playerOne} is X and goes first!`);
  }
}


$('.cell').on('click', function() {
  if ($(this).text() === "") {
    $(this).text(currentPlayer);
    let cellId =  $(this).attr('id');
    gameState.board[cellId - 1] = currentPlayer;
    turnCounter++;
    if (checkWin()) {
      $('.turncontrol').text(`${currentPlayer  === x ? playerOne : playerTwo} Wins !`);
      currentPlayer === x ? playerOneWins++ : playerTwoWins++;
      $('.playerScore').text(playerOneWins);
      $('.cpuScore').text(playerTwoWins);       
      setTimeout( resetGame, 1000);
      return;
    }
    if (turnCounter === 9) {
      $('.turncontrol').text(`Draw Game!`);
      setTimeout(resetGame, 1000)
      return;
    }
    switchPlayers();
    if (playerTwo === 'CPU') {
      computerPlayer();
    }
  } else {
    alert("Invalid Move");
  }
})


$('.resetbutton').on('click', function () {
  choosePlayers();
  resetGame();
  playerOneWins = 0;
  playerTwoWins = 0;
  $('.playerScore').text(playerOneWins);
  $('.cpuScore').text(playerTwoWins);
})


function resetGame () {
  gameState.board =  [
    null, null, null,
    null, null, null,
    null, null, null
  ];
  $('.cell').text("");
  turnCounter = 0;
  currentPlayer = gameState.players[Math.floor(Math.random()*2)];
  announceStartingPlayer();
}


function switchPlayers () {
  currentPlayer = currentPlayer === x ? o : x;
  $('.turncontrol').text(`${currentPlayer === x ? playerOne : playerTwo} is next !`); 
}


function computerPlayer() {
  let computerMove =  Math.floor(Math.random()*9);
  while (gameState.board[computerMove] !== null && turnCounter <= 9) {
    computerMove =  Math.floor(Math.random()*9);
  }
  if (gameState.board[4]=== null) {
    computerMove = 4;
  }
  gameState.board[computerMove] = currentPlayer;
  let computerChoice = document.getElementById(`${computerMove + 1}`);
  $(computerChoice).text(currentPlayer);
  turnCounter++;
  if (checkWin()) {
    $('.turncontrol').text(`${currentPlayer  === x ? playerOne : playerTwo} Wins !`);
    currentPlayer === x ? playerOneWins++ : playerTwoWins++;
    $('.playerScore').text(playerOneWins);
    $('.cpuScore').text(playerTwoWins);
    setTimeout( resetGame, 1000);
    return;
  }
  if (turnCounter === 9) {
    $('.turncontrol').text(`Draw Game!`);
    setTimeout(resetGame, 1000);
    return;
  }
  switchPlayers();
}


function checkWin() {
  if (gameState.board[0] !== null && gameState.board[1] === gameState.board[0] && gameState.board[2] === gameState.board[0]) {
    return true;
  }else if (gameState.board[3] !== null && gameState.board[4] === gameState.board[3] && gameState.board[5] === gameState.board[3]) {
    return true;
  }else if (gameState.board[6] !== null && gameState.board[7] === gameState.board[6] && gameState.board[8] === gameState.board[6]) {
    return true;
  }else if (gameState.board[0] !== null && gameState.board[3] === gameState.board[0] && gameState.board[6] === gameState.board[0]) {
    return true;
  }else if (gameState.board[1] !== null && gameState.board[4] === gameState.board[1] && gameState.board[7] === gameState.board[1]) {
    return true;
  }else if (gameState.board[2] !== null && gameState.board[5] === gameState.board[2] && gameState.board[8] === gameState.board[2]) {
    return true;
  }else if (gameState.board[0] !== null && gameState.board[4] === gameState.board[0] && gameState.board[8] === gameState.board[0]) {
    return true;
  }else if (gameState.board[2] !== null && gameState.board[4] === gameState.board[2] && gameState.board[6] === gameState.board[2]) {
    return true;
  }
}

choosePlayers();




