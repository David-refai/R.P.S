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
const playerName = document.querySelector(".logging__input");
const start = document.querySelector(".logging__btn");
const welcome = document.querySelector(".welcome");
const logging = document.querySelector(".logging");
const error = document.querySelector(".error");
const error_name_length = document.querySelector(".error_name");
const rules = document.querySelector(".rules");
const closes = document.querySelectorAll(".close");
const newGame = document.querySelector(".new-game");
console.log(error);

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

      if (e.target.getAttribute('id') === 'save') {
        console.log("save");
        dataForSaving.push(
          new Players(player, computerChoice, result, date)
        );
        localStorage.setItem("data", JSON.stringify(dataForSaving));
        document.querySelector(".notification").classList.remove("hidden");
        document.querySelector(".notification").classList.add("notification_show");
      }

      setTimeout(() => {
        document.querySelector(".notification").classList.add("hidden");
        document.querySelector(".notification").classList.remove("notification_show");
      }, 3000);

   
     
    });
  });
}
navModal();

function showOverlay(modal) {
    overlay.classList.remove("hidden");
  overlay.classList.add("show_2");
  overlay.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.classList.remove("show_2");
    overlay.classList.add("hidden");
    modal.classList.remove("show");
    modal.classList.add("hidden");

    
    stopVideo(rules);
  });
}

function closeModel() {
  closes.forEach((close) => {
    close.addEventListener("click", (e) => {
      e.preventDefault();
      let parent = close.parentNode.parentNode;
      parent.classList.remove("show");
      parent.classList.add("hidden");
      overlay.classList.remove("show_2");
      overlay.classList.add("hidden");
      stopVideo(rules);
    });
  });
}
closeModel();




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
          restart.classList.remove("hidden");
          restart.classList.add("show_2");
          choices.forEach((choice) =>
            choice.setAttribute("disabled", "disabled")
          );
          result =
            playerOneScore > playerTwoScore
              ? `${playerName.value} wins 🏆`
              : "computer wins 😭";
              //? getting the date and time
          date = `${hour}:${minute} ${day}/${month}/${year}`;

          player = new Players(playerOneScore, playerTwoScore, result, date);
          dataForSaving.push(player);

          //? saving the data to statistics table
          tbody.innerHTML += `<tr><td>${player.player}</td><td>${player.computer}</td><td>${player.result}</td><td>${player.date}</td></tr>`;
 
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
      restart.classList.remove("show_2");
    });
  }
  
  //? function for starting the game after the user has entered a name
function startGame() {
    start.addEventListener("click", (e) => {
      e.preventDefault();
  
      if (playerName.value === "") {
        showError(error);
        setTimeout(() => {
          hideError(error);
        }, 2500);
      } else if (playerName.value.length > 12 || playerName.value.length < 3) {
        showError(error_name_length);
        setTimeout(() => {
          hideError(error_name_length);
        }, 2500);
      } else if (localStorage.getItem(playerName.value) !== null) {
        showData();
      } else {
        welcome.textContent = `Welcome ${playerName.value}`;
        logging.classList.add("hidden");
        overlay.classList.remove("show_2");
        overlay.classList.add("hidden");
      }
    });
  }

  startGame();

    //? function for showing the error message
    function showError(error) {
        error.classList.remove("hidden");
        error.classList.add("show_2");
        playerName.style.border = "3px solid red";
        }
        //? function for hiding the error message
        function hideError(error) {
        error.classList.remove("show_2");
        error.classList.add("hidden");
        playerName.style.border = "none";
        
        }

        function stopVideo (modal) {
          let currentIframe = modal.querySelector('.video');
          currentIframe.src = currentIframe.src;
        
          console.log(currentIframe.src);
          
        };