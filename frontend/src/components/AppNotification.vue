<template>
  <ul v-if="notifications.length > 0" id="notification">
    <li v-for="(notification, index) in notifications" :key="index" :class="notification.classItem">
        <i :class="['fas fa-2x', notification.classIcon]"></i>
        <p>{{ notification.message }}</p>
        <i @click="removeNotification(index)" class="fas fa-times"></i>
    </li>
  </ul>
</template>

<script>
  import '@/../public/assets/scripts/variables.js';
  import {useNotificationsStore} from "@/store/notifications";

  export default {
    name: 'AppNotification',
    setup() {
      const notificationsStore = useNotificationsStore();
      const notifications = notificationsStore.notifications;

      /**
       * @see notificationsStore#removeNotification
       */
      const removeNotification = (index) => {
        notificationsStore.removeNotification(index);
      };

      return {
        notifications,
        removeNotification
      };
    }
  }
</script>

<style>
#notification {
  width: 100%;
  position: fixed;
  bottom: 1%;
  text-align: center;
  color: var(--text-color);
}

#notification li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 50%;
  border-radius: 3px;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  background-color: var(--overlay-color);
  transform: translateY(150%);
  transition: 0.5s;
  padding: 0 3%;
  position: relative;
}

#notification li+li {
  margin-top: 2%;
}

#notification p {
  padding: 0 3%;
}

#notification li i.fa-times:hover {
  cursor: pointer;
}

li.success {
  box-shadow: 0 0 2px #259c08;
  transform: translateY(0%) !important;
  z-index: 100;
}
li.success i:first-of-type {
  color: #0ad406;
}

li.error {
  box-shadow: 0 0 2px #ff0303;
  transform: translateY(0%) !important;
}
li.error i:first-of-type {
  color: #ff0303;
}

@media screen and (max-width: 900px) {

  #notification li {
    width: 60%;
  }
}

@media screen and (max-width: 768px) {

  #notification li {
    width: 70%;
  }
}

@media screen and (max-width: 480px) {

  #notification li {
    width: 85%;
  }
}
</style>
