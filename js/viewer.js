"use strict";
const images = [];
const slider = document.getElementById("slider");
const currentPageEl = document.getElementById("currentPage");
const totalPagesEl = document.getElementById("totalPages");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;
let currentIndex = 0;
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
    if (currentIndex < images.length - 1) {
        currentIndex++;
        renderSlide();
    }
}
function prev() {
    if (currentIndex > 0) {
        currentIndex--;
        renderSlide();
    }
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
slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});
slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});
function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) < swipeThreshold)
        return;
    if (deltaX < 0) {
        next();
    }
    else {
        prev();
    }
}
slider.addEventListener("touchmove", (e) => {
    const currentX = e.changedTouches[0].screenX;
    const delta = currentX - touchStartX;
    slider.style.transform = `translateX(${delta * 0.2}px)`;
});
slider.addEventListener("touchend", () => {
    slider.style.transform = "";
});
renderSlide();
