import { defineStore } from 'pinia';
import {NotificationType} from "@/utils/enum";

export const useNotificationsStore = defineStore({
    id: 'notifications',
    state: () => ({
        notifications: [],
        idCounter: 1,
        empty: true,
        promise: null,
    }),
    actions: {
        /**
         * Add a notification as success - with auto remove.
         */
        async addNotificationSuccess() {
            await this._addNotification(NotificationType.SUCCESS);
        },
        /**
         * Add a notification as error - with auto remove.
         */
        async addNotificationError() {
            await this._addNotification(NotificationType.ERROR);
        },
        /**
         * @private Internal method for adding a notification with automatic removal.
         * @param {NotificationType} type - The type of the notification.
         */
        async _addNotification(type) {
            await this._acquirePromise();
            const id = this.idCounter++;
            const notification = {id, type}
            this.empty = false;
            this.notifications.push(notification);
            this._releasePromise();

            setTimeout(() => {
                this.removeNotification(0);
            }, 5000);
        },
        /**
         * Remove a notification.
         * @param {number} index - The index of the notification to remove.
         */
        async removeNotification(index) {
            await this._acquirePromise();
            this.notifications.splice(index, 1);
            this._releasePromise();
          
            setTimeout(async () => {
                await this._acquirePromise();
                if(this.notifications.length === 0) {
                    this.empty = true;
                }
                this._releasePromise();
            }, 1000); // Let enough time for the last notification to execute its animation
        },
        /**
         * @private Internal method to access the promise.
         * @returns {Promise<void>}
         */
        async _acquirePromise() {
            while (this.promise) {
                await this.promise;
            }

            this.promise = new Promise((resolve) => {
                resolve();
            });
        },
        /**
         * @private Internal method to release the promise.
         */
        _releasePromise() {
            this.promise = null;
        },
    },
});