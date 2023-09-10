import { defineStore } from 'pinia';
import {NotificationType} from "@/utils/enum";

export const useNotificationsStore = defineStore({
    id: 'notifications',
    state: () => ({
        notifications: [],
    }),
    actions: {
        /**
         * Add a notification as success - with auto remove.
         */
        addNotificationSuccess() {
            this._addNotification(NotificationType.SUCCESS);
        },
        /**
         * Add a notification as error - with auto remove.
         */
        addNotificationError() {
            this._addNotification(NotificationType.ERROR);
        },
        /**
         * @private Internal method for adding a notification with automatic removal.
         * @param {NotificationType} type - The type of the notification.
         */
        _addNotification(type) {
            this.notifications.push(type);
            setTimeout(() => {
                this.removeNotification(0);
            }, 5000);
        },
        /**
         * Remove a notification.
         * @param {number} index - The index of the notification to remove.
         */
        removeNotification(index) {
            this.notifications.splice(index, 1);
        },
    },
});