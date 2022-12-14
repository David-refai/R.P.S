"use strict";

const navLinks = document.querySelectorAll(".nav_link");
const overlay = document.querySelector(".overlay");
const choices = document.querySelectorAll(".choice-btn");
const imgOne = document.querySelector(".player-one-img");

// console.log(navLinks);

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

