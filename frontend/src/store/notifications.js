import { defineStore } from 'pinia';

export const useNotificationsStore = defineStore({
    id: 'notifications',
    state: () => ({
        notifications: [],
    }),
    actions: {
        addNotification(message, type) {
            console.log("test2")
            this.notifications.push({ message, type });
            console.log("test3")
        },
        removeNotification(index) {
            this.notifications.splice(index, 1);
        },
    },
});