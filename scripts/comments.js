const comments = document.querySelector("#comments-widget");
const toggle = document.querySelector("[data-comments-toggle]");
const close = document.querySelector("[data-comments-close]");

if (comments && toggle && close) {
  toggle.addEventListener("click", () => comments.showModal());
  close.addEventListener("click", () => comments.close());
  comments.addEventListener(
    "close",
    () => toggle.focus({ preventScroll: true }),
  );
}
