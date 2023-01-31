const selectorBackgroundLogo = '#background-logo'
const yValueTranslateLogo = (-1/12)

let atScroll = false
const scrollProgress = () => { atScroll = true };

$(document).ready( function() {

    $(window).scroll(scrollProgress)
    const logo = document.querySelectorAll(selectorBackgroundLogo)

    const raf = () => {
        if (atScroll) {

            logo.forEach((element, index) => {

                let transform = "translateZ(0) translateY(" + window.scrollY * yValueTranslateLogo + "%)"

                element.style.backfaceVisibility = "hidden"
                element.style.mozBackfaceVisibility = "hidden"
                element.style.oBackfaceVisibility = "hidden"
                element.style.msBackfaceVisibility = "hidden"
                element.style['-webkit-backface-visibility'] = "hidden"

                element.style.transform = transform
                element.style.mozTransform = transform
                element.style.oTransform = transform
                element.style.msTransform = transform
                element.style['-webkit-transform'] = transform + "scale(1.0, 1.0)"
                element.style['-webkit-overflow-scrolling'] = "touch"
            });
            atScroll = false
        }
        requestAnimationFrame(raf)
    };
    requestAnimationFrame(raf)
})