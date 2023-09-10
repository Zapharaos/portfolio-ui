<template>
  <section id="section-contact">
    <h3>Contact</h3>
    <form id="form-contact">
      <div>
        <input type="text" id="name" name="name" placeholder="Name" tabindex="1" required>
        <input type="email" id="email" name="email" placeholder="Email" tabindex="2" required>
      </div>
      <input type="text" id="subject" name="subject" placeholder="Subject" tabindex="3" required>
      <textarea rows="5" id="message" name="message" placeholder="Message" tabindex="4" required></textarea>
      <button @click="sendMessageRequest" type="submit" name="submit" value="Submit" tabindex="5">Submit</button>
      <input type="hidden" name="spam">
    </form>
    {{ notifications }}
  </section>
</template>

<script>
/* eslint-disable */
import { useNotificationsStore } from '@/store/notifications'; // Import the notifications store
export default {
  setup() {
    const notificationsStore = useNotificationsStore(); // Access the notifications store instance

    const notifications = notificationsStore.notifications;

    const showNotification = (e) => {
      e.preventDefault()
      console.log("test1")
      notificationsStore.addNotification('New message', 'info'); // 'info' is the type
    };

    return {
      notifications,
      showNotification
    };
  },
  name: 'FormContact',
  methods: {
    sendMessageRequest(e) {
      e.preventDefault()

      //showNotification()

      /*this.$store.commit('notification/showMessage', {
        message: 'This is a notification message!',
        type: 'info', // You can change the type as needed (info, success, error, etc.)
      });*/

      /*$.ajax({
          type: 'post',
          url: 'contact.php',
          data: $('form-contact').serialize(),
          success: function (result) {
              if (result === 1){
                  toggleNotificationSuccess()
                  setTimeout(disableNotifications, 5000)
              } else {
                  toggleNotificationError()
                  setTimeout(disableNotifications, 5000)
              }
              contact.reset();
              let url = document.location.href;
              window.history.pushState({}, "", url.split("?")[0]);
          }
      });*/
    }
  }
}
</script>

<style>
#section-contact {
  margin-top: 8%;
  padding-bottom: 5%;
  background-color: var(--snd-bg-color);
}

#section-contact form input, #section-contact form textarea {
  font-family: "Open Sans", sans-serif;
  background-color: transparent;
  color: var(--text-color);
  border: solid 1px transparent;
  border-bottom: solid 1px var(--main-color);
  padding: 1em;
  resize: none;
  margin: 2em 0 0 0;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  border-radius:0;
  transition: all ease-in-out 600ms;
}

#section-contact form input:focus, #section-contact form textarea:focus {
  outline: none;
  border: solid 1px var(--main-color);
  border-radius: 5px;
}

#section-contact form input::placeholder, #section-contact form textarea::placeholder {
  font-family: "Open Sans", sans-serif;
}

#section-contact form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  margin: 0 auto;
  border-radius: 5px;
}

#section-contact form div {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
}

#section-contact form div input {
  width: 40%;
}

#section-contact form button {
  width: min-content;
  margin: 0 auto;
  margin-top: 3em;
  padding: 0 5em;
}

#section-contact button:focus, #section-contact button:hover {
  background-color: var(--button-scd-hover-color);
}

@media screen and (max-width: 1024px) {

  #section-contact form div {
    flex-direction: column;
  }

  #section-contact form div input {
    width: auto;
  }
}

@media screen and (max-width: 900px) {

  #section-contact form {
    width: 60%;
  }
}

@media screen and (max-width: 768px) {

  #section-contact form {
    width: 70%;
  }
}

@media screen and (max-width: 480px) {

  #section-contact form {
    width: 85%;
  }
}
</style>
