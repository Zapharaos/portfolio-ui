const idFormContact = 'form-contact'
const idCloseNotifications = "close-notifications"
const selectorNotification = '#notification'
const selectorMessage = '#notification p'
const selectorIcon = '#notification i.fa-2x'

const classNotificationSuccess = 'success'
const classNotificationError = 'error'
const classIconSuccess = 'fa-check-circle'
const classIconError = 'fa-exclamation-circle'
const messageSuccess = "Thanks for contacting us, we will be in touch with you shortly !"
const messageError = "Sorry, something went wrong. Please try again later !"

// declared variables but initialized later
let notification;
let message;
let icon;

$(document).ready( function() {

    notification = document.querySelector(selectorNotification)
    message = document.querySelector(selectorMessage)
    icon = document.querySelector(selectorIcon)

    document.getElementById(idFormContact).addEventListener('submit', function(e) {
        sendMessage(e)
    })

    let closeNotifications = document.getElementById(idCloseNotifications)
    closeNotifications.addEventListener('click', disableNotifications)
})

function sendMessage(e) {
    e.preventDefault()
    /*$.ajax({
        type: 'post',
        url: 'contact.php',
        data: $('form-contact').serialize(),
        success: function (result) {
            if (result === 1){
                toggleNotificationSuccess()
                setTimeout(disableNotifications,5000)
            } else {
                toggleNotificationError()
                setTimeout(disableNotifications,5000)
            }
            contact.reset();
            let url = document.location.href;
            window.history.pushState({}, "", url.split("?")[0]);
        }
    });*/
}

function disableNotifications() {
    notification.classList.remove(classNotificationSuccess)
    notification.classList.remove(classNotificationError)
    icon.classList.remove(classIconSuccess)
    icon.classList.remove(classIconError)
    message.innerHTML = ""
}

function toggleNotificationError() {
    notification.classList.remove(classNotificationSuccess)
    notification.classList.add(classNotificationError)
    icon.classList.remove(classIconSuccess)
    icon.classList.add(classIconError)
    message.innerHTML = messageError
}

function toggleNotificationSuccess() {
    notification.classList.add(classNotificationSuccess)
    notification.classList.remove(classNotificationError)
    icon.classList.add(classIconSuccess)
    icon.classList.remove(classIconError)
    message.innerHTML = messageSuccess
}