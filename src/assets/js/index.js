const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

console.log(hamburger)
hamburger.addEventListener('click', ()=>{
    console.log("here")
    //themepicker.classList.remove("is-open")
    navLinks.classList.toggle("open");
    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});