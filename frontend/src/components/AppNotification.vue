<template>
  <section id="notifications">
    <TransitionGroup name="notification" tag="ul" appear>
      <li
          v-for="(notification, index) in notifications"
          :key="notification.id"
          :class="notification.type.classItem"
      >
        <i :class="['fas fa-2x', notification.type.classIcon]"></i>
        <p>{{ notification.type.message }}</p>
        <i @click="removeNotification(index)" class="fas fa-times"></i>
      </li>
    </TransitionGroup>
  </section>
</template>

<script>
  import {computed} from "vue";
  import {useNotificationsStore} from "@/store/notifications";

  export default {
    name: 'AppNotification',
    setup() {
      const notificationsStore = useNotificationsStore();
      const notifications = notificationsStore.notifications;
      const isEmpty = computed(() => notificationsStore.empty);

      /**
       * @see notificationsStore#removeNotification
       */
      const removeNotification = (index) => {
        notificationsStore.removeNotification(index);
      };

      return {
        notifications,
        isEmpty,
        removeNotification
      };
    }
  }
</script>

<style>

/* Transitions */

.notification-enter-active,
.notification-leave-active {
  transition: all 1s ease;
}
.notification-leave-active {
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
.notification-move {
  transition: all 0.5s ease;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.notification-enter-to,
.notification-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Elements */

#notifications {
  position: fixed;
  bottom: 1%;
  width: 100%;
}

#notifications ul {
  position: relative;
}

#notifications li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  padding: 0 3%;
  border-radius: 3px;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  background-color: var(--overlay-color);
}

#notifications li+li {
  margin-top: 1%;
}

#notifications p {
  padding: 0 3%;
  user-select: none;
  text-align: center;
}

#notifications li i.fa-times:hover {
  cursor: pointer;
}

li.success {
  box-shadow: 0 0 2px #259c08;
}
li.success i:first-of-type {
  color: #0ad406;
}

li.error {
  box-shadow: 0 0 2px #ff0303;
}
li.error i:first-of-type {
  color: #ff0303;
}

@media screen and (max-width: 900px) {

  #notifications li {
    width: 60%;
  }
}

@media screen and (max-width: 768px) {

  #notifications li {
    width: 70%;
  }
}

@media screen and (max-width: 480px) {

  #notifications li {
    width: 85%;
  }
}
</style>
