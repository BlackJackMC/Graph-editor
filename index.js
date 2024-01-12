canvas = document.querySelector("#editor");
context = canvas.getContext("2d");

canvas.style.height = canvas.style.width = "100%";
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

window.addEventListener("resize", () => {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});


