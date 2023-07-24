// DOM Elements
const idButtonThemeSwitcher = "theme-switcher"
const attributeThemeLabel = "theme"

// Themes : TODO : get from DB
const themes = [
    {
        "id": "dark",
        "next": "light"
    },
    {
        "id": "light",
        "next": "dark"
    }]

$(document).ready( function() {
    document.getElementById(idButtonThemeSwitcher).addEventListener('click',  () => {
        switchTheme(themes)
    })
})

/* switches the theme */
function switchTheme(themes) {
    let currentTheme = document.body.getAttribute(attributeThemeLabel)
    for(let i = 0; i < themes.length; i++)
    {
        if(currentTheme === themes[i].id) // find current theme
        {
            document.body.setAttribute(attributeThemeLabel, themes[i].next) // switch to the next theme
            return
        }
    }
}