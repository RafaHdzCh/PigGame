'use strict';

//  Option 1
//      const queryScore0ID = document.querySelector("#score--0");
//  Option 2
//      const totalScore0ID = document.getElementById("score--0");

let gameOver = false;
let activePlayer = 0;
let currentScore = 0;
const scores = [0,0];

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const totalScore0ID = document.getElementById("score--0");
const totalScore1ID = document.getElementById("score--1");
const currentScore0ID = document.getElementById("current--0");
const currentScore1ID = document.getElementById("current--1");

const dice = document.querySelector(".dice");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const buttonNewGame = document.querySelector(".btn--new");


function SetValuesForNewGame()
{
    gameOver = false;
    activePlayer = 0;
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;

    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    totalScore0ID.textContent = 0;
    totalScore1ID.textContent = 0;
    currentScore0ID.textContent = 0;
    currentScore1ID.textContent = 0;
    
    dice.classList.add("hidden");
    buttonRoll.addEventListener("click", Roll);
    buttonHold.addEventListener("click", Hold);
    buttonNewGame.addEventListener("click", NewGame);
}
SetValuesForNewGame();

function Roll()
{
    if(gameOver) return;

    const rolledNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `dice-${rolledNumber}.png`; 

    if(rolledNumber !== 1)
    {
        currentScore += rolledNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else
    {
       SwitchPlayer();
    }
}

function Hold()
{ 
    if(gameOver) return;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 10)
    {
        SetWinner();
    }
    else
    {
        SwitchPlayer();
    }
}

function NewGame()
{
    SetValuesForNewGame();
}

function SetWinner()
{
    gameOver=true;
    //console.log("GAME OVER");
    const winnerPlayer = document.querySelector(`.player--${activePlayer}`);
    winnerPlayer.classList.add("player--winner");
    player0.classList.remove("player--active");
    player1.classList.remove("player--active");
    dice.classList.add("hidden");
}

function SwitchPlayer()
{
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}