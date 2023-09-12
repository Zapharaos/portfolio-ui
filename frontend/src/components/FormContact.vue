<template>
  <section id="section-contact">
    <h3>Contact</h3>
    <form id="form-contact" @submit.prevent="sendEmail">
      <div>
        <div class="form-field" :class="{ 'error': dataFormContact.name.error }">
          <input
              v-model="dataFormContact.name.value"
              @change="formValidateField('name')"
              placeholder="Name"
              type="text"
          />
          <span v-if="dataFormContact.name.error">
            <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
            {{ dataFormContact.name.error }}
          </span>
        </div>
        <div class="form-field" :class="{ 'error': dataFormContact.email.error }">
          <input
              v-model="dataFormContact.email.value"
              @change="formValidateField('email')"
              placeholder="Email"
              type="email"
          />
          <span v-if="dataFormContact.email.error">
            <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
            {{ dataFormContact.email.error }}
          </span>
        </div>
      </div>
      <div class="form-field" :class="{ 'error': dataFormContact.subject.error }">
        <input
            v-model="dataFormContact.subject.value"
            @change="formValidateField('subject')"
            placeholder="Subject"
            type="text"
        />
        <span v-if="dataFormContact.subject.error">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
          {{ dataFormContact.subject.error }}
        </span>
      </div>
      <div class="form-field" :class="{ 'error': dataFormContact.message.error }">
        <textarea
            v-model="dataFormContact.message.value"
            @change="formValidateField('message')"
            placeholder="Message"
            rows="5"
        />
        <span v-if="dataFormContact.message.error">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
          {{ dataFormContact.message.error }}
        </span>
      </div>
      <button type="submit" value="Submit">Submit</button>
    </form>
  </section>
</template>

<script>
// TODO : CSRF
import { ref } from "vue";
import { useNotificationsStore } from '@/store/notifications';
import axios from '@/axios.config';

export default {
  name: 'FormContact',
  setup() {

    // Function to generate a form field structure.
    const createFormField = () => ({
      value: "",
      error: "",
    });

    // Function to generate the form structure.
    const setupForm = () => {
      return {
        name: createFormField(),
        email: createFormField(),
        subject: createFormField(),
        message: createFormField(),
      }
    }

    // Set up the form data and fields.
    const dataFormContact = ref(setupForm());

    // Set up the available error messages.
    const errorMessages = {
      required: "Field is required",
      invalidEmail: "Invalid email address",
    };

    // Set up the notifications store.
    const notificationsStore = useNotificationsStore();
    const notifications = notificationsStore.notifications;

    // Send the contact message to the owner.
    const sendEmail = () => {

      // Check each field content.
      for (const fieldName in dataFormContact.value) {
        formValidateField(fieldName);
      }

      // Check if any field has an error.
      for (const fieldName in dataFormContact.value) {
        if (dataFormContact.value[fieldName].error) {
          return;
        }
      }

      // Extract only the field values.
      const dataFieldValues = {};
      for (const dataField in dataFormContact.value) {
        dataFieldValues[dataField] = dataFormContact.value[dataField].value;
      }

      // Sending the email through the backend.
      axios.post('/send_email/', dataFieldValues)
          .then(response => {
            if (response && response.data) {
              dataFormContact.value = setupForm(); // Clear the form fields.
              notificationsStore.addNotificationSuccess();
            } else {
              notificationsStore.addNotificationError();
            }
          })
          .catch(error => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error_type
            ) {
              const data = error.response.data;
              // Searching for the error details to show the user.
              switch (data.error_type) {
                case 'empty_field':
                  if(data.empty_fields) {
                    // Set error value for each empty field.
                    data.empty_fields.forEach(fieldName => {
                      if (dataFormContact.value[fieldName]) {
                        dataFormContact.value[fieldName].error = errorMessages.required;
                      }
                    });
                  } else {
                    notificationsStore.addNotificationError();
                  }
                  break;
                case 'invalid_email':
                  dataFormContact.value['email'].error = errorMessages.invalidEmail
                  break;
                case 'config_missing':
                case 'email_send_error':
                default:
                  notificationsStore.addNotificationError();
              }
            } else {
              notificationsStore.addNotificationError();
            }
          });
    };

    /**
     * Validate the field.
     * @param fieldName
     */
    const formValidateField = (fieldName) => {
      const field = dataFormContact.value[fieldName];

      // Check if the field is empty and sets the error variable accordingly.
      if (!field.value) {
        field.error = errorMessages.required;
        return;
      } else {
        field.error = "";
      }

      // If the field is an email.
      if (fieldName === "email") {
        // Validate email format.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          field.error = errorMessages.invalidEmail;
        }
      }
    };

    return {
      dataFormContact,
      notifications,
      sendEmail,
      formValidateField,
    };
  }
}
</script>

<style>
#section-contact {
  margin-top: 8%;
  padding-bottom: 5%;
  background-color: var(--snd-bg-color);
}

#section-contact form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  margin: 0 auto;
  border-radius: 5px;
}

#section-contact .form-field {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
}

#section-contact .form-field input {
  width: 40%;
}

#section-contact .form-field.error input, #section-contact .form-field.error textarea {
  outline: none;
  border: solid 2px var(--error-color);
  border-radius: 5px;
  color: var(--error-color);
  transition: all ease-in-out 0s;
}

#section-contact .form-field.error span {
  color: var(--error-color);
  font-size: smaller;
  margin-top: 0.25rem;
}

#section-contact input, #section-contact textarea {
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
  transition: all ease-in-out 0.6s;
}

#section-contact input:focus, #section-contact textarea:focus {
  outline: none;
  border: solid 1px var(--main-color);
  border-radius: 5px;
}

#section-contact input::placeholder, #section-contact textarea::placeholder {
  font-family: "Open Sans", sans-serif;
}

#section-contact button {
  width: min-content;
  margin: 0 auto;
  margin-top: 3em;
  padding: 0 5em;
}

#section-contact button:focus, #section-contact button:hover {
  background-color: var(--button-scd-hover-color);
}

@media screen and (max-width: 1024px) {

  #section-contact .form-field {
    flex-direction: column;
  }

  #section-contact .form-field input {
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
