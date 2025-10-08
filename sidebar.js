const toggle = document.getElementById("side-bar-toggle");
const side_wrapper = document.getElementById("sidebar-wrapper");
const close = document.getElementById("close-sidebar");

toggle.addEventListener("click", (e) => {
    e.preventDefault();
    side_wrapper.style.display = "flex";
});

close.addEventListener("click", (e) => {
    e.preventDefault();
    side_wrapper.style.display = "none";
});