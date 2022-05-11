<template>
  <div>
    <GitHubSearch />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GitHubSearch from '@/components/GitHubSearch.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    GitHubSearch
  },
});
</script>