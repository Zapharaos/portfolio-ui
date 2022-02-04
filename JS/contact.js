const success = "Thanks for contacting us, we will be in touch with you shortly !";
const error = "Sorry, something went wrong. Please try again later !";
let form = document.getElementById('form');

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