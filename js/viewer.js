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
const head = document.getElementById("head");
let isMouseOverHeader = false;
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
        setTimeout(() => {
            if (!isMouseOverHeader) {
                head.style.cssText = "transform: translateY(-100%); transition: all 0.8s ease-in-out;";
            }
        }, 2000);
    }
    else {
        document.exitFullscreen();
        head.style.cssText = "transform: translateY(0); transition: all 0.8s ease-in-out;";
    }
});
document.addEventListener("click", () => {
    if (document.fullscreenElement) {
        head.style.cssText = "transform: translateY(0); transition: all 0.8s ease-in-out;";
        setTimeout(() => {
            if (!isMouseOverHeader) {
                head.style.cssText = "transform: translateY(-100%); transition: all 0.8s ease-in-out;";
            }
        }, 2000);
    }
});
head.addEventListener("mouseenter", () => {
    isMouseOverHeader = true;
    head.style.cssText = "transform: translateY(0); transition: all 0.3s ease-in-out;";
});
head.addEventListener("mouseleave", () => {
    isMouseOverHeader = false;
    if (document.fullscreenElement) {
        setTimeout(() => {
            if (!isMouseOverHeader) {
                head.style.cssText = "transform: translateY(-100%); transition: all 0.8s ease-in-out;";
            }
        }, 2000);
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
slider.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const currentX = e.changedTouches[0].screenX;
    const delta = currentX - touchStartX;
    slider.style.transform = `translateX(${delta * 0.2}px)`;
}, { passive: false });
renderSlide();
