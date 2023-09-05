const themeBtn = document.querySelector(".switch-theme");
const body = document.querySelector("body");

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
});
