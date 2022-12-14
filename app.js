"use strict";

const navLinks = document.querySelectorAll(".nav_link");
const overlay = document.querySelector(".overlay");
const choices = document.querySelectorAll(".choice-btn");
const imgOne = document.querySelector(".player-one-img");
const imgTwo = document.querySelector(".player-two-img");
const scoreOne = document.querySelector("#player-one-score");
const scoreTwo = document.querySelector("#player-two-score");
const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");

const table = document.querySelector(".table");
const tr = document.createElement("tr");
const td = document.createElement("td");
const tbody = document.querySelector("tbody");
const restart = document.querySelector(".restart-btn");
// console.log(navLinks);

const arr = ["rock", "paper", "scissors"];
let computerChoice;
let reqAnimate;
let speed;
let playerOneScore = 0;
let playerTwoScore = 0;
let result;
let date;
let player;
let now = new Date();
let day = now.getDate();
let month = now.getMonth() + 1;
let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();

function Players(player, computer, result, date) {
  this.player = player;
  this.computer = computer;
  this.result = result;
  this.date = date;
}

let dataForSaving = [];
function navModal() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("href").slice(1);
      const element = document.getElementById(id);

      if (id) {
        element.classList.add("show");
        element.classList.remove("hidden");
        showOverlay(element);
      }
    });
  });
}
navModal();

function showOverlay(modal) {
  overlay.classList.add("show");
  overlay.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.classList.remove("show");
    modal.classList.remove("show");
    modal.classList.add("hidden");
  });
}
//? function for giving the computer a random animations speed
const animate = function () {
  speed = Math.random() * 0.5 + 0.5;
  if (speed > 0.1) {
    computerChoice = arr[Math.floor(Math.random() * arr.length)];
  }
  if (computerChoice === "rock") {
    imgTwo.src = "/image/rock.png";
    imgTwo.style.transform = "rotate(0deg)";
  } else {
    imgTwo.src = `/image/${computerChoice}.png`;
    imgTwo.style.transform = "rotate(180deg)";
  }

  reqAnimate = requestAnimationFrame(animate);
};
function game() {
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      e.preventDefault();
      const playerChoice = e.currentTarget.getAttribute("id");
      if (playerChoice === "rock") {
        imgOne.style.transform = "rotate(180deg)";
        imgOne.src = "./image/rock.png";
      } else if (playerChoice === "paper") {
        imgOne.src = "./image/paper.png";
        imgOne.style.transform = "rotate(0deg)";
      } else if (playerChoice === "scissors") {
        imgOne.style.transform = "rotate(0deg)";
        imgOne.src = "./image/scissors.png";
      }
      choices.forEach((choice) => choice.setAttribute("disabled", "disabled"));
      animate();
      setTimeout(() => {
        cancelAnimationFrame(reqAnimate);

        if (
          (playerChoice === "rock" && computerChoice === "scissors") ||
          (playerChoice === "paper" && computerChoice === "rock") ||
          (playerChoice === "scissors" && computerChoice === "paper")
        ) {
          console.log("player one wins");
          playerOneScore++;
        } else if (
          (playerChoice === "rock" && computerChoice === "paper") ||
          (playerChoice === "paper" && computerChoice === "scissors") ||
          (playerChoice === "scissors" && computerChoice === "rock")
        ) {
          console.log("player two wins");
          playerTwoScore++;
        }
        scoreTwo.textContent = playerTwoScore;
        scoreOne.textContent = playerOneScore;

        if (playerOneScore === 1 || playerTwoScore === 1) {
          playerOneScore
            ? playerOne.classList.add("winner")
            : playerTwo.classList.add("winner");
          //   restartGame();
          restart.style.display = "block";
          choices.forEach((choice) =>
            choice.setAttribute("disabled", "disabled")
          );
          result =
            playerOneScore > playerTwoScore
              ? `${name.value} wins 🏆`
              : "computer wins 😭";
          date = `${hour}:${minute} ${day}/${month}/${year}`;

          player = new Players(playerOneScore, playerTwoScore, result, date);
          dataForSaving.push(player);

          tbody.innerHTML += `<tr><td>${player.player}</td><td>${player.computer}</td><td>${player.result}</td><td>${player.date}</td></tr>`;
        //   console.log(dataForSaving);

          // playerOneScore = 0;
          // playerTwoScore = 0;
        } else {
          choices.forEach((choice) =>
            choice.removeAttribute("disabled", "disabled")
          );
        }
      }, 500);
    });
  });
}

game();
restartGame();

//? function for restarting the game after a player clicks the play again button
function restartGame() {
    restart.addEventListener("click", function () {
      playerOneScore = 0;
      playerTwoScore = 0;
      scoreTwo.textContent = playerTwoScore;
      scoreOne.textContent = playerOneScore;
      playerOne.classList.remove("winner");
      playerTwo.classList.remove("winner");
      choices.forEach((choice) => choice.removeAttribute("disabled", "disabled"));
      restart.style.display = "none";
    });
  }
  