const toggle = document.getElementById("side-bar-toggle");
const side_wrapper = document.getElementById("sidebar-wrapper");
const close = document.getElementById("close-sidebar");
const header = document.getElementById("header");

toggle.addEventListener("click", (e) => {
    e.preventDefault();
    side_wrapper.style.display = "flex";
    header.style.display = "none";
});

close.addEventListener("click", (e) => {
    e.preventDefault();
    side_wrapper.style.display = "none";
    header.style.display = "block";
});