<template>
  <div class="user">
    <GitHubUser></GitHubUser>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios"
import type { User } from '@/models/user'
import GitHubUser from '@/components/GitHubUser.vue';

export default defineComponent({
  name: 'UserView',
  components: {
    GitHubUser
  }
})
</script>