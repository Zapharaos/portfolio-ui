const idBackgroundLogo = 'background-logo'

// Scroll infos
let scrolling = false
const enableScrollProgress = () => { scrolling = true };
const disableScrollProgress = () => { scrolling = false };

$(document).ready( function() {

    $(window).scroll(enableScrollProgress)

    const raf = () => {
        if (scrolling) {

            let transform = "translateZ(0) translateY(" + (window.scrollY * -1/10) + "%)"
            let logo = document.getElementById(idBackgroundLogo)

            // Hiding backface
            /*logo.style.backfaceVisibility = "hidden"
            logo.style.mozBackfaceVisibility = "hidden"
            logo.style.oBackfaceVisibility = "hidden"
            logo.style.msBackfaceVisibility = "hidden"
            logo.style['-webkit-backface-visibility'] = "hidden"*/

            // Transform
            logo.style.transform = transform
            logo.style.mozTransform = transform
            logo.style.oTransform = transform
            logo.style.msTransform = transform
            logo.style['-webkit-transform'] = transform + "scale(1.0, 1.0)"
            logo.style['-webkit-overflow-scrolling'] = "touch"

            disableScrollProgress()
        }
        requestAnimationFrame(raf)
    };
    requestAnimationFrame(raf)
})