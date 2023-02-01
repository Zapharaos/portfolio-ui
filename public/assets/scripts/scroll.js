const speed = ['slow', 'fast']

const selectorHeader = 'header'
const idHeaderLogo = 'header-logo'
const idTop = 'top'

const headerLabel = 'header-'
const sectionLabel = 'section-'
const defaultSectionNames = ['aboutme', 'contact']

$(document).ready( function() {

    let last = 0
    let top = document.getElementById(idTop)
    let header = document.getElementsByTagName(selectorHeader)[0]

    top.addEventListener('click', function () {
        goToByScroll(selectorHeader, speed[1])
    })
    document.getElementById(idHeaderLogo).addEventListener('click', function () {
        goToByScroll(selectorHeader, speed[1])
    })

    enableGoToSections(defaultSectionNames.concat(['experience', 'formation', 'project']))

    /* toggle the "scroll to top" button & the header */
    window.addEventListener("scroll", function () {
        let current = document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (current > last) { // downscroll code
            header.style.top = "-150px";
            top.style.display = "none";
        } else { // upscroll code
            header.style.top = "0px";
            header.style.boxShadow = "0px 3px 10px 0px #111";
            top.style.display = "flex";
        }
        if (current === 0) {
            header.style.boxShadow = "none";
            top.style.display = "none";
        }
        last = current <= 0 ? 0 : current; // For Mobile or negative scrolling
    }, false);
})

function enableGoToSections(sectionLabels) {
    console.log(sectionLabels)
    sectionLabels.forEach(function(name) {
        document.getElementById(headerLabel + name).addEventListener('click', function () {
            goToByScroll(sectionLabel + name, speed[0])
        })
    })
}

/* nav between sections to avoid having "#id" in the url */
function goToByScroll(id, speed){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},speed);
}