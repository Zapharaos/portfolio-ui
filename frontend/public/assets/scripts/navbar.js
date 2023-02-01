const idBars = 'bars'
const idOverlay = 'overlay'
const selectorNav = 'nav'
const selectorBody = 'body'
const selectorsTrigger = '#overlay, #logo, nav li a'

const classBarsActive = 'bars-active'
const classNavActive = 'nav-active'
const classDisableScrolling = 'disable-scrolling'

$(document).ready( function() {
    /* toggle the responsive navbar */
    const navbarToggle = () => {
        const trigger = document.querySelectorAll(selectorsTrigger);
        const bars = document.getElementById(idBars);
        const overlay = document.getElementById(idOverlay);
        const nav = document.querySelector(selectorNav)
        const body = document.querySelector(selectorBody)

        bars.addEventListener("click", function() {
            if (!nav.classList.contains(classNavActive) && !bars.classList.contains(classBarsActive)) {
                bars.classList.add(classBarsActive)
                nav.classList.add(classNavActive)
                body.classList.add(classDisableScrolling);
                overlay.style.display = "block";
            }
            else {
                bars.classList.remove(classBarsActive)
                nav.classList.remove(classNavActive)
                body.classList.remove(classDisableScrolling);
                overlay.style.display = "none";
            }
        });

        for (let i = 0; i < trigger.length; i++) {
            trigger[i].addEventListener("click", function() {
                bars.classList.remove(classBarsActive)
                nav.classList.remove(classNavActive)
                body.classList.remove(classDisableScrolling);
                overlay.style.display = "none";
            });
        }
    }
    navbarToggle();
})