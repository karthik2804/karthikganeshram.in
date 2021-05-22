const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener('click', ()=>{
    console.log("here")
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("toggle");
});


/********************
*Theme picker start
*********************/
const themepicker = document.getElementById("themepicker")
const ThemeSwitch = document.getElementById("themeSwitch")
let themes = ["default", "dark", "dark2", "light2"]

let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (themes.includes(currentTheme)) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}
else {
    let prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
        currentTheme = 'dark'
    }
    else {
        currentTheme = "default"
    }
}


function switchTheme(tag) {
    console.log(tag)
    document.getElementById(currentTheme).classList.remove("is-active")
    localStorage.setItem('theme',tag); //add this
    currentTheme = tag
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.getElementById(tag).classList.add("is-active")
}

function toggleThemeSelection() {
        themepicker.classList.toggle("is-open")
}
/********************
*Theme picker end
*********************/

