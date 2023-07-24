/* Authorized duration for the .animate() function :
https://api.jquery.com/animate/#:~:text=The%20default%20duration%20is%20400,200%20and%20600%20milliseconds%2C%20respectively.
 */
const AnimateDuration = {
    SLOW: 200,
    DEFAULT: 400,
    FAST: 600
};

// DOM elements
const tagHeader = 'header'
const idHeaderLogo = 'header-logo'
const idButtonPageTop = 'toPageTop'
const defaultSectionNames = ['aboutme', 'contact', 'experience', 'formation', 'project'] // TODO : link to DB

// CSS class labels
const classHeaderHidden = 'hidden'
const classButtonPageToTopActive = 'active'

// Variables
let lastPosition = 0
let upScrolling = false

$(document).ready( function() {

    let buttonToPageTop = document.getElementById(idButtonPageTop)
    let header = document.getElementsByTagName(tagHeader)[0]

    /* buttons heading to the top of the page */
    buttonToPageTop.addEventListener('click', function () {
        goToIdByAutoScroll(tagHeader, AnimateDuration.FAST)
    })
    document.getElementById(idHeaderLogo).addEventListener('click', function () {
        goToIdByAutoScroll(tagHeader, AnimateDuration.FAST)
    })

    /* toggle the "scroll to the top of the page" button & the sticky header */
    window.addEventListener("scroll", function () {
        let currentPosition = document.documentElement.scrollTop
        if (currentPosition === 0) // START
        {
            header.classList.remove(classHeaderHidden)
            buttonToPageTop.classList.remove(classButtonPageToTopActive)
        }
        else if (currentPosition > lastPosition && upScrolling) // DOWN SCROLLING
        {
            upScrolling = false
            header.classList.add(classHeaderHidden)
            buttonToPageTop.classList.remove(classButtonPageToTopActive)
        } else if (currentPosition <= lastPosition && !upScrolling) // UP SCROLLING
        {
            upScrolling = true
            header.classList.remove(classHeaderHidden)
            buttonToPageTop.classList.add(classButtonPageToTopActive)
        }
        lastPosition = currentPosition <= 0 ? 0 : currentPosition // For Mobile or negative scrolling
    }, false)

    /* enables a smooth scrolling animation from the menu to the sections */
    defaultSectionNames.forEach(function(sectionName) {
        document.getElementById('nav-' + sectionName).addEventListener('click', function () {
            goToIdByAutoScroll('section-' + sectionName, AnimateDuration.SLOW)
        })
    })
})

/* navigates smoothly to an element (avoids having "#id" in the url) */
function goToIdByAutoScroll(id, duration){
    if(document.getElementById(id))
    {
        $('html,body').animate({scrollTop: $("#"+id).offset().top}, duration)
    }
}