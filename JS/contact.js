let submit = document.querySelector('#submit');

submit.addEventListener('click', function (){
    console.log("click");
    $.ajax({
        url: 'PHP/contact.php',
        type: 'POST',
        data: {
            name: '',
            email: 'email@example.com',
            subject: '',
            message: 'hello world!'
        },
        success: function(msg) {
            alert('Email Sent');
        }
    });
});


function toggleNotification(status, content) {
    const notification = document.querySelector('#notification');
    const message = document.querySelector('#notification p');

    if(status == 0)
    {
        notification.classList.remove('success');
        notification.classList.add('error');
        message.innerHTML = content;
    } else if (status == 1) {
        notification.classList.remove('error');
        notification.classList.add('success');
        message.innerHTML = content;
    } else {
        notification.classList.remove('success');
        notification.classList.remove('error');
        message.innerHTML = "";
    }

}