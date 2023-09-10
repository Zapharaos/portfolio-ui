/**
 * Enum representing notification content for different types of notifications.
 *
 * @enum {Object}
 * @property {string} classItem - The CSS class for the notification item.
 * @property {string} classIcon - The CSS class for the notification icon.
 * @property {string} message - The message content for the success notification.
 */
export const NotificationType = {
    /**
     * Content for a success notification.
     */
    SUCCESS: {
        classItem: 'success',
        classIcon: 'fa-check-circle',
        message: 'Thanks for contacting us, we will be in touch with you shortly!',
    },

    /**
     * Content for an error notification.
     */
    ERROR: {
        classItem: 'error',
        classIcon: 'fa-exclamation-circle',
        message: 'Sorry, something went wrong. Please try again later!',
    },
};
