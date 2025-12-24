"use strict";
const images = [];
const slider = document.getElementById("slider");
const currentPageEl = document.getElementById("currentPage");
const totalPagesEl = document.getElementById("totalPages");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
let currentIndex = 0;
let isNavigating = false;
const NAVIGATION_DELAY = 400;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;
for (let i = 1; i <= 53; i++) {
    if (i < 10) {
        images.push("./files/COMPANY PROFILE- TIMBERS ART x SNIM STEEL_Page_0" + i + ".png");
    }
    else {
        images.push("./files/COMPANY PROFILE- TIMBERS ART x SNIM STEEL_Page_" + i + ".png");
    }
}
totalPagesEl.textContent = images.length.toString();
function renderSlide() {
    slider.innerHTML = "";
    const img = document.createElement("img");
    img.src = images[currentIndex];
    img.loading = "lazy";
    img.className = `
    max-h-[90vh] max-w-[90vw]
    object-contain
    transition-all duration-500 ease-out
    opacity-0 scale-95
  `;
    slider.appendChild(img);
    requestAnimationFrame(() => {
        img.classList.remove("opacity-0", "scale-95");
        img.classList.add("opacity-100", "scale-100");
    });
    currentPageEl.textContent = (currentIndex + 1).toString();
    progressBar.style.width = `${((currentIndex + 1) / images.length) * 100}%`;
}
function next() {
    if (isNavigating || currentIndex >= images.length - 1)
        return;
    isNavigating = true;
    currentIndex++;
    renderSlide();
    setTimeout(() => (isNavigating = false), NAVIGATION_DELAY);
}
function prev() {
    if (isNavigating || currentIndex <= 0)
        return;
    isNavigating = true;
    currentIndex--;
    renderSlide();
    setTimeout(() => (isNavigating = false), NAVIGATION_DELAY);
}
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
        next();
    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        prev();
});
fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
});
let lastScroll = 0;
window.addEventListener("wheel", (e) => {
    const now = Date.now();
    if (now - lastScroll < 500)
        return;
    e.deltaY > 0 ? next() : prev();
    lastScroll = now;
});
slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
slider.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const currentX = e.changedTouches[0].screenX;
    const delta = currentX - touchStartX;
    slider.style.transform = `translateX(${delta * 0.2}px)`;
}, { passive: false });
slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    slider.style.transform = "";
    handleSwipe();
});
function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) < swipeThreshold || isNavigating)
        return;
    deltaX < 0 ? next() : prev();
}
renderSlide();
