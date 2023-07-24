// DOM elements
const idBars = 'bars'
const idOverlay = 'overlay'
const selectorHeader = 'header'
const selectorNav = 'nav'
const selectorBody = 'body'
const navSectionsButtons = 'nav li a'

// CSS class labels
const classBarsActive = 'bars-active'
const classNavActive = 'nav-active'
const classDisableScrolling = 'disable-scrolling'

$(document).ready( function() {

    // Elements
    const bars = document.getElementById(idBars)
    const header = document.querySelector(selectorHeader)
    const nav = document.querySelector(selectorNav)
    const body = document.querySelector(selectorBody)

    // Overlay
    let overlayElement = document.createElement("span")
    overlayElement.id = idOverlay
    overlayElement.addEventListener("click", disableNavOverlay)

    // Functions related to the overlay
    function isNavOverlayActive()
    {
        return !nav.classList.contains(classNavActive) && !bars.classList.contains(classBarsActive)
    }

    function enableNavOverlay()
    {
        bars.classList.add(classBarsActive)
        nav.classList.add(classNavActive)
        body.classList.add(classDisableScrolling)
        header.appendChild(overlayElement)
    }

    function disableNavOverlay()
    {
        bars.classList.remove(classBarsActive)
        nav.classList.remove(classNavActive)
        body.classList.remove(classDisableScrolling)
        header.removeChild(overlayElement)
    }

    /* toggles the responsive navbar */
    bars.addEventListener("click", function() {
        if (isNavOverlayActive())
        {
            enableNavOverlay()
        }
        else
        {
            disableNavOverlay()
        }
    })

    /* event listeners to close the responsive navbar */
    document.querySelectorAll(navSectionsButtons).forEach((trigger) => {
        trigger.addEventListener("click", disableNavOverlay)
    })

})