
let atScroll = false;
let logo = document.querySelectorAll("#background-logo");

const scrollProgress = () => {
    atScroll = true;
};

const raf = () => {
    if (atScroll) {

        logo.forEach((element, index) => {

            let transform = "translateZ(0) translateY(" + window.scrollY *-1 / 12 + "%)";

            element.style.backfaceVisibility = "hidden";
            element.style.mozBackfaceVisibility = "hidden";
            element.style.oBackfaceVisibility = "hidden";
            element.style.msBackfaceVisibility = "hidden";
            element.style['-webkit-backface-visibility'] = "hidden";

            element.style.transform = transform;
            element.style.mozTransform = transform;
            element.style.oTransform = transform;
            element.style.msTransform = transform;
            element.style['-webkit-transform'] = transform + "scale(1.0, 1.0)";

            element.style['-webkit-overflow-scrolling'] = "touch";
        });

        atScroll = false;
    }
    requestAnimationFrame(raf);
};

requestAnimationFrame(raf);
window.addEventListener("scroll", scrollProgress);