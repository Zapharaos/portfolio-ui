import { defineStore } from 'pinia';
import {NotificationType} from "@/utils/enum";

export const useNotificationsStore = defineStore({
    id: 'notifications',
    state: () => ({
        notifications: [],
    }),
    actions: {
        addNotificationSuccess() {
            this.notifications.push(NotificationType.SUCCESS);
        },
        addNotificationError() {
            this.notifications.push(NotificationType.ERROR);
        },
        removeNotification(index) {
            this.notifications.splice(index, 1);
        },
    },
});