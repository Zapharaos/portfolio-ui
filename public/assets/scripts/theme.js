const idThemeSwicther = "theme-switcher"
const attributeTheme = "theme"

$(document).ready( function() {
    enableSwitchTheme(["dark", "light"])
})

function enableSwitchTheme(themes) {
    let themeSwitcher = document.getElementById(idThemeSwicther)
    themeSwitcher.addEventListener('click',  () => {
        switchTheme(themes)
    })
}

/* switches the theme */
function switchTheme(themes) {
    if(themes[0] === document.body.getAttribute(attributeTheme))
        document.body.setAttribute(attributeTheme, themes[1])
    else
        document.body.setAttribute(attributeTheme, themes[0])
}