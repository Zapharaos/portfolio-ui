<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error loading user data.</div>
    <div v-if="user">
      <h2>{{ user.hero }}</h2>
      <p>{{ user.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from 'vue';
import {getUserData} from './services/user';
import type {User} from "./types/models";

export default {
  name: 'User',
  setup() {
    const user = ref<User | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        user.value = await getUserData();
        console.log(user.value)
      } catch (err) {
        error.value = (err as Error).message;
      } finally {
        loading.value = false;
      }
    });

    return { user, loading, error };
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
