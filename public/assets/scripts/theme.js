const idThemeSwicther = "theme-switcher"
const attributeTheme = "theme"
const theme = ["dark", "light"]

$(document).ready( function() {
    let themeSwitcher = document.getElementById(idThemeSwicther)
    themeSwitcher.addEventListener('click', switchTheme)
})

/* switches the theme */
function switchTheme() {
    if(theme[0] === document.body.getAttribute(attributeTheme))
        document.body.setAttribute(attributeTheme, theme[1])
    else
        document.body.setAttribute(attributeTheme, theme[0])
}