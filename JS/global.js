
var last = 0;
var header = document.getElementsByTagName('header')[0];
var top_button = document.getElementById('top');

/* toggle the "scroll to top" button & the header */
window.addEventListener("scroll", function(){
    var current = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (current > last){ // downscroll code
        header.style.top = "-150px";
        top_button.style.display = "none";
    } else { // upscroll code
        header.style.top = "0px";
        header.style.boxShadow = "0px 3px 10px 0px #111";
        top_button.style.display = "flex";
    }
    if(current == 0)
    {
        header.style.boxShadow = "none";
        top_button.style.display = "none";
    }
    last = current <= 0 ? 0 : current; // For Mobile or negative scrolling
}, false);

/* nav between sections to avoid having "#id" in the url */
function goToByScroll(id, speed){
    setTimeout(function(){
        $('html,body').animate({scrollTop: $("#"+id).offset().top},speed);
    }, 250);
}

/* switches the theme */
function switchTheme() {
    let theme = document.body.getAttribute("theme");
    if(theme == "light")
        theme = "dark";
    else
        theme = "light";
    document.body.setAttribute("theme", theme);
}

/* toggle the responsive navbar */
const navbarToggle = () => {
    const trigger = document.querySelectorAll('#overlay, #logo, .nav-links li a, .nav-links li i');
    const bars = document.getElementById('bars');
    const overlay = document.getElementById('overlay');
    const nav = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    bars.addEventListener("click", function() {
            if (!nav.classList.contains("nav-active") && !bars.classList.contains("bars-active")) {
                bars.classList.add('bars-active');
                nav.classList.add('nav-active');
                body.classList.add('disable-scrolling');
                overlay.style.display = "block";
            }
            else {
                bars.classList.remove('bars-active');
                nav.classList.remove("nav-active");
                body.classList.remove('disable-scrolling');
                overlay.style.display = "none";
            }
        });

    for (let i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener("click", function() {
            bars.classList.remove('bars-active');
            nav.classList.remove("nav-active");
            body.classList.remove('disable-scrolling');
            overlay.style.display = "none";
        });
    }
}
navbarToggle();

const success = "Thanks for contacting us, we will be in touch with you shortly !";
const error = "Sorry, something went wrong. Please try again later !";

function toggleNotification(status, content) {
    const notification = document.querySelector('#notification');
    const message = document.querySelector('#notification p');
    const icon = document.querySelector('#notification i.fa-2x');

    if(status === 0)
    {
        notification.classList.remove('success');
        notification.classList.add('error');
        icon.classList.remove('fa-check-circle');
        icon.classList.add('fa-exclamation-circle');
        message.innerHTML = content;
    } else if (status === 1) {
        notification.classList.remove('error');
        notification.classList.add('success');
        icon.classList.remove('fa-exclamation-circle');
        icon.classList.add('fa-check-circle');
        message.innerHTML = content;
    } else {
        notification.classList.remove('success');
        notification.classList.remove('error');
        icon.classList.remove('fa-check-circle');
        icon.classList.remove('fa-exclamation-circle');
        message.innerHTML = "";
    }
}

let form = document.getElementById('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: 'PHP/contact.php',
        data: $('form').serialize(),
        success: function (result) {
            if (result == 1){
                toggleNotification(1, success);
                setTimeout(function(){
                    toggleNotification(2,'');
                }, 5000);
            } else {
                toggleNotification(0, error);
                setTimeout(function(){
                    toggleNotification(2,'');
                }, 5000);
            }
            form.reset();
            var url= document.location.href;
            window.history.pushState({}, "", url.split("?")[0]);
        }
    });
});